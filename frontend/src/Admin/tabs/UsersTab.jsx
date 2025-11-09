import React from 'react';
import { DEPARTMENTS, TEST_CATEGORIES } from '../constants';
import { addUserTest, updateUserTest, deleteUserTest, clearUserTests } from '../../api/admin';
import papersApi from '../../api/papers';

export default function UsersTab({ canManage = false, users, setUsers, filtered, paged, selected, setSelected, openEdit, handleDelete, loading, error, q, setQ, department, setDepartment, page, setPage, pageSize, createOpen, setCreateOpen, setError }) {
  const [testModalOpen, setTestModalOpen] = React.useState(false);
  const [editTestIndex, setEditTestIndex] = React.useState(null);
  const [testForm, setTestForm] = React.useState({ category: '', score: 0, date: '', timeSpent: '', totalQuestions: '' });
  const [selectedCategory, setSelectedCategory] = React.useState('');
  // Solutions modal state (admin view)
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);
  const [solutionsLoading, setSolutionsLoading] = React.useState(false);
  const [solutionsError, setSolutionsError] = React.useState('');
  const [solutionsQuestions, setSolutionsQuestions] = React.useState([]);
  const [solutionsMeta, setSolutionsMeta] = React.useState({ category: '', date: '', paperId: '', title: '', score: undefined, timeSpent: undefined, totalQuestions: undefined });
  // Ref: details container for auto-scroll
  const detailsRef = React.useRef(null);

  // When a user is selected, smoothly scroll the details section into view
  React.useEffect(() => {
    if (!selected) return;
    const id = setTimeout(() => {
      const el = detailsRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = window.pageYOffset + rect.top;
      // Offset for sticky admin header (~64-80px)
      const offset = 80;
      window.scrollTo({ top: Math.max(0, top - offset), behavior: 'smooth' });
    }, 0);
    return () => clearTimeout(id);
  }, [selected]);

  // Helper: show relative time within 24 hours, else return null
  const formatRelativeIfRecent = React.useCallback((d) => {
    if (!d) return null;
    const date = new Date(d);
    const now = new Date();
    const diffMs = now - date;
    if (isNaN(diffMs) || diffMs < 0) return null;
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return null; // older than 24h -> do not show relative label
  }, []);

  // Helper: format a Date to 'YYYY-MM-DDTHH:MM' in local time for <input type="datetime-local">
  const toLocalDateTimeInput = React.useCallback((date) => {
    const pad = (n) => String(n).padStart(2, '0');
    const dt = new Date(date);
    const yyyy = dt.getFullYear();
    const mm = pad(dt.getMonth() + 1);
    const dd = pad(dt.getDate());
    const hh = pad(dt.getHours());
    const min = pad(dt.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }, []);

  const categoryOptions = React.useMemo(() => {
    const userCats = Array.from(new Set((selected?.testHistory || []).map(t => t.category).filter(Boolean)));
    const union = Array.from(new Set([ ...TEST_CATEGORIES, ...userCats ]));
    return union.sort();
  }, [selected]);
  function computeUser(u) {
    const th = u.testHistory || [];
    const totalTests = th.length;
    const averageScore = totalTests > 0 ? Math.round((th.reduce((s, t) => s + (t.score || 0), 0) / totalTests) * 10) / 10 : 0;
    const totalTimeSpent = th.reduce((s, t) => s + (t.timeSpent || 0), 0);
    const bestScore = Math.max(...th.map((t) => t.score || 0), 0);
    const improvement = totalTests > 1 ? (th[totalTests - 1].score - th[0].score) : 0;
    return { ...u, totalTests, averageScore, totalTimeSpent, bestScore, improvement };
  }

  async function handleDeleteTest(index) {
    if (!selected) return;
    if (!window.confirm('Delete this test entry?')) return;
    try {
      await deleteUserTest(selected._id, index);
      const updatedHistory = (selected.testHistory || []).filter((_, i) => i !== index);
      const updatedUser = computeUser({ ...selected, testHistory: updatedHistory });
      setUsers((prev) => prev.map((u) => (u._id === selected._id ? updatedUser : u)));
      setSelected(updatedUser);
    } catch (e) {
      setError('Failed to delete test entry');
    }
  }

  async function handleClearAllTests() {
    if (!selected) return;
    if (!window.confirm('Delete ALL test data for this user? This cannot be undone.')) return;
    try {
      await clearUserTests(selected._id);
      const updatedUser = computeUser({ ...selected, testHistory: [] });
      setUsers((prev) => prev.map((u) => (u._id === selected._id ? updatedUser : u)));
      setSelected(updatedUser);
    } catch (e) {
      setError('Failed to clear tests');
    }
  }

  function openAddTest() {
    setEditTestIndex(null);
    setTestForm({ category: selectedCategory || '', score: 0, date: toLocalDateTimeInput(new Date()), timeSpent: '', totalQuestions: '' });
    setTestModalOpen(true);
  }

  function openEditTest(i) {
    const t = selected?.testHistory?.[i];
    if (!t) return;
    setEditTestIndex(i);
    setTestForm({
      category: t.category || '',
      score: t.score ?? 0,
      date: t.date ? toLocalDateTimeInput(new Date(t.date)) : toLocalDateTimeInput(new Date()),
      timeSpent: t.timeSpent ?? '',
      totalQuestions: t.totalQuestions ?? ''
    });
    setTestModalOpen(true);
  }

  async function saveTest() {
    if (!selected) return;
    const payload = {
      category: String(testForm.category || '').trim(),
      score: Number(testForm.score || 0),
      date: testForm.date,
      timeSpent: testForm.timeSpent === '' ? undefined : Number(testForm.timeSpent),
      totalQuestions: testForm.totalQuestions === '' ? undefined : Number(testForm.totalQuestions)
    };
    try {
      let updatedUser;
      if (editTestIndex === null) {
        const res = await addUserTest(selected._id, payload);
        updatedUser = computeUser(res);
      } else {
        const res = await updateUserTest(selected._id, editTestIndex, payload);
        updatedUser = computeUser(res);
      }
      setUsers((prev) => prev.map((u) => (u._id === selected._id ? updatedUser : u)));
      setSelected(updatedUser);
      setTestModalOpen(false);
    } catch (e) {
      setError('Failed to save test entry');
    }
  }

  // Open solutions modal for a specific test entry
  async function openSolutions(testEntry) {
    if (!testEntry || !testEntry.paperId || !testEntry.category) {
      setSolutionsError('Solutions not available for this attempt.');
      setSolutionsOpen(true);
      setSolutionsQuestions([]);
      setSolutionsMeta({
        category: testEntry?.category || '',
        date: testEntry?.date || '',
        paperId: testEntry?.paperId || '',
        title: '',
        score: testEntry?.score,
        timeSpent: testEntry?.timeSpent,
        totalQuestions: testEntry?.totalQuestions
      });
      return;
    }
    setSolutionsOpen(true);
    setSolutionsLoading(true);
    setSolutionsError('');
    setSolutionsQuestions([]);
    setSolutionsMeta({
      category: testEntry.category || '',
      date: testEntry.date || '',
      paperId: testEntry.paperId || '',
      title: '',
      score: testEntry?.score,
      timeSpent: testEntry?.timeSpent,
      totalQuestions: testEntry?.totalQuestions
    });
    try {
      const paper = await papersApi.getPaper(testEntry.category, testEntry.paperId);
      if (paper && Array.isArray(paper.questions)) {
        setSolutionsQuestions(paper.questions.map(q => ({
          question: q.question,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation,
        })));
        // If backend includes a normalized category/title, prefer it for display
        if (paper.category) setSolutionsMeta(m => ({ ...m, category: m.category || paper.category }));
        if (paper.title) setSolutionsMeta(m => ({ ...m, title: paper.title }));
      } else {
        setSolutionsError('Solutions not available for this attempt.');
      }
    } catch (e) {
      setSolutionsError('Failed to load solutions.');
    } finally {
      setSolutionsLoading(false);
    }
  }

  const selectedAnalytics = React.useMemo(() => {
    if (!selected) return null;
    const th = selected.testHistory || [];
    const totalTests = th.length;
    const avgScore = totalTests > 0 ? Math.round((th.reduce((s, t) => s + (t.score || 0), 0) / totalTests) * 10) / 10 : 0;
    const totalTimeSpent = th.reduce((s, t) => s + (t.timeSpent || 0), 0);

    const byCat = new Map();
    for (const t of th) {
      const b = byCat.get(t.category) || { sum: 0, count: 0, time: 0, points: [] };
      b.sum += t.score || 0;
      b.count += 1;
      b.time += t.timeSpent || 0;
      b.points.push({ d: new Date(t.date).getTime(), s: t.score || 0 });
      byCat.set(t.category, b);
    }
    const categories = Array.from(byCat.entries()).map(([category, v]) => {
      const sorted = v.points.sort((a, b) => a.d - b.d);
      return {
        category,
        avg: Math.round((v.sum / v.count) * 10) / 10,
        count: v.count,
        avgTimeSpent: v.count > 0 ? Math.round(v.time / v.count) : 0,
        series: sorted.map((p) => p.s),
      };
    }).sort((a, b) => b.count - a.count);

    const today = new Date();
    const dayKey = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10);
    const keys = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (13 - i));
      return dayKey(d);
    });
    const grouped = new Map();
    for (const t of th) {
      const k = dayKey(new Date(t.date));
      const g = grouped.get(k) || { sum: 0, count: 0, time: 0 };
      g.sum += t.score || 0;
      g.count += 1;
      g.time += t.timeSpent || 0;
      grouped.set(k, g);
    }
    const dailyCounts = keys.map((k) => grouped.get(k)?.count || 0);
    const dailyAvgScores = keys.map((k) => {
      const g = grouped.get(k);
      return g && g.count > 0 ? Math.round((g.sum / g.count) * 10) / 10 : 0;
    });
    const dailyAvgTime = keys.map((k) => {
      const g = grouped.get(k);
      return g && g.count > 0 ? Math.round(g.time / g.count) : 0;
    });

    return { totalTests, avgScore, totalTimeSpent, categories, dailyCounts, dailyAvgScores, dailyAvgTime };
  }, [selected]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <select
            value={department}
            onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {canManage && (
            <button
              onClick={() => { setSelected(null); setCreateOpen(true); setError(''); }}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New User
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Users ({filtered.length})</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-slate-500">Loading users...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <p className="mt-2 text-slate-500">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tests</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Score</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {paged.map((user) => (
                  <tr key={user._id} className={`hover:bg-slate-50 ${selected?._id === user._id ? 'bg-green-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => setSelected(user)}>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{user.name}</div>
                          <div className="text-sm text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{user.department || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{user.totalTests || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600">{user.averageScore || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button onClick={() => setSelected(user)} className="text-slate-600 hover:text-slate-900 p-1 rounded">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        {canManage && (
                          <>
                            <button onClick={() => openEdit(user)} className="text-blue-600 hover:text-blue-900 p-1 rounded">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900 p-1 rounded">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length > pageSize && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-700">
              Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-slate-700">Page {page} of {Math.ceil(filtered.length / pageSize)}</span>
              <button onClick={() => setPage(p => Math.min(Math.ceil(filtered.length / pageSize), p + 1))} disabled={page === Math.ceil(filtered.length / pageSize)} className="px-3 py-1 text-sm border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div ref={detailsRef} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">User Details</h3>
            <div className="flex space-x-2">
                {canManage && (
                  <>
                    <button onClick={handleClearAllTests} className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm">
                      Clear All Tests
                    </button>
                    <button onClick={() => openEdit(selected)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(selected._id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Delete
                    </button>
                  </>
                )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Name</label>
                <p className="text-slate-900">{selected.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <p className="text-slate-900">{selected.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Mobile</label>
                <p className="text-slate-900">{selected.mobile || '-'}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Department</label>
                <p className="text-slate-900">{selected.department || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Last Login</label>
                <p className="text-slate-900">{selected.lastLogin ? new Date(selected.lastLogin).toLocaleDateString() : '-'}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">Total Tests</div>
              <div className="text-xl font-bold text-slate-900">{selected.totalTests || 0}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">Average</div>
              <div className="text-xl font-bold text-green-600">{selected.averageScore || 0}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">Best</div>
              <div className="text-xl font-bold text-emerald-600">{selected.bestScore || 0}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">Improvement</div>
              <div className={`text-xl font-bold ${ (selected.improvement || 0) >= 0 ? 'text-amber-600' : 'text-red-600'}`}>{selected.improvement || 0}%</div>
            </div>
          </div>

          {selectedAnalytics && selectedAnalytics.categories.length > 0 && (
            <div className="mt-6">
              <h4 className="text-base font-semibold text-slate-900 mb-3">Category Performance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedAnalytics.categories.slice(0, 6).map((cat) => (
                  <div key={cat.category} className="p-4 rounded-xl border border-slate-200 hover:border-green-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-slate-900">{cat.category}</h5>
                      <span className="text-sm font-semibold text-green-600">{cat.avg}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: `${Math.min(100, cat.avg)}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{cat.count} attempts</span>
                      {/* Removed minute display from category performance analytics */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedAnalytics && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-slate-900">Daily Test Activity</h5>
                  <span className="text-xs text-slate-500">14 days</span>
                </div>
                <div className="h-24 flex items-end space-x-1">
                  {selectedAnalytics.dailyCounts.map((count, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t" style={{ height: `${Math.max(8, (count / Math.max(1, Math.max(...selectedAnalytics.dailyCounts))) * 100)}%` }} />
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-500">Total: {selectedAnalytics.dailyCounts.reduce((a, b) => a + b, 0)} tests</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-slate-900">Average Score Trend</h5>
                  <span className="text-xs text-slate-500">14 days</span>
                </div>
                <div className="h-24 flex items-end space-x-1">
                  {(() => {
                    const maxAvg = Math.max(1, Math.max(...selectedAnalytics.dailyAvgScores));
                    return selectedAnalytics.dailyAvgScores.map((score, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-amber-500 to-yellow-400 rounded-t" style={{ height: `${Math.max(8, (score / maxAvg) * 100)}%` }} />
                    ));
                  })()}
                </div>
                <div className="mt-2 text-xs text-slate-500">Average: {selectedAnalytics.avgScore}</div>
              </div>
            </div>
          )}

          {/* Section tests and stats */}
          {selected && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-lg font-semibold text-slate-900">Section Tests</h4>
                  <select
                    value={selectedCategory}
                    onChange={(e)=>setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-md bg-white"
                  >
                    <option value="">All</option>
                    {Array.from(new Set((selected.testHistory||[]).map(t=>t.category))).sort().map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {(() => {
                    const withIndex = (selected.testHistory||[]) 
                      .map((t,i)=>({ t, i }))
                      .filter(x => !selectedCategory || x.t.category === selectedCategory);
                    if (withIndex.length === 0) return null;
                    const sorted = withIndex.sort((a,b) => new Date(b.t.date) - new Date(a.t.date));
                    const latest = sorted[0]?.t;
                    if (!latest) return null;
                    const label = new Date(latest.date).toLocaleDateString();
                    return (
                      <span className="text-xs text-slate-500">Last update: {label}</span>
                    );
                  })()}
                </div>
                {canManage && (
                  <button onClick={openAddTest} className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">Add Test</button>
                )}
              </div>

              {(() => {
                const withIndex = (selected.testHistory||[]).map((t,i)=>({ t, i }));
                let filteredByCat = selectedCategory ? withIndex.filter(x => x.t.category === selectedCategory) : withIndex;
                // Only hide entries with empty/invalid date
                filteredByCat = filteredByCat.filter(({ t }) => t && t.date);
                // Sort latest first by date
                filteredByCat = filteredByCat.sort((a,b) => new Date(b.t.date) - new Date(a.t.date));
                const scores = filteredByCat.map(x => x.t.score || 0);
                const attempts = filteredByCat.length;
                const avg = attempts > 0 ? Math.round((scores.reduce((a,b)=>a+b,0)/attempts)*10)/10 : 0;
                const best = attempts > 0 ? Math.max(...scores) : 0;
                return (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-lg p-4 text-center">
                        <div className="text-xs text-slate-500 mb-1">Section</div>
                        <div className="text-sm font-semibold text-slate-900">{selectedCategory || 'All'}</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 text-center">
                        <div className="text-xs text-slate-500 mb-1">Attempts</div>
                        <div className="text-xl font-bold text-slate-900">{attempts}</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 text-center">
                        <div className="text-xs text-slate-500 mb-1">Average</div>
                        <div className="text-xl font-bold text-green-600">{avg}</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4 text-center">
                        <div className="text-xs text-slate-500 mb-1">Best</div>
                        <div className="text-xl font-bold text-emerald-600">{best}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {filteredByCat.length === 0 ? (
                        <p className="text-slate-500 text-sm">No tests in this section yet.</p>
                      ) : (
                        filteredByCat.map(({t, i}) => (
                          <div key={`${t.category}-${i}`} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                              <h5 className="font-medium text-slate-900">{t.category}</h5>
                              <p className="text-sm text-slate-500">{new Date(t.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-lg font-semibold text-green-600">{t.score}</p>
                                <p className="text-xs text-slate-500">{t.totalQuestions} questions</p>
                              </div>
                              {/* View Solutions removed per requirement */}
                              {canManage && (
                                <div className="flex items-center gap-1">
                                  <button onClick={() => openEditTest(i)} className="p-2 text-blue-600 hover:text-blue-800 rounded" title="Edit this test">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button onClick={() => handleDeleteTest(i)} className="p-2 text-red-600 hover:text-red-800 rounded" title="Delete this test">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Test History block (read-only add; edit/delete allowed) */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-slate-900">Test History</h4>
              {/* Intentionally no Add Test button here */}
            </div>
            <div className="space-y-3">
              {(selected.testHistory || []).length === 0 ? (
                <p className="text-slate-500 text-sm">No tests taken yet.</p>
              ) : (
                (selected.testHistory || [])
                  .filter((t) => t && t.date)
                  .map((test, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-slate-900">{test.category}</h5>
                      <p className="text-sm text-slate-500">{new Date(test.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">{test.score}</p>
                        <p className="text-xs text-slate-500">{test.totalQuestions} questions</p>
                      </div>
                      {canManage && (
                        <div className="flex items-center gap-1">
                          <button onClick={() => openEditTest(i)} className="p-2 text-blue-600 hover:text-blue-800 rounded" title="Edit this test">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button onClick={() => handleDeleteTest(i)} className="p-2 text-red-600 hover:text-red-800 rounded" title="Delete this test">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Test Modal */}
      {canManage && testModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">{editTestIndex === null ? 'Add Test' : 'Edit Test'}</h3>
              <button onClick={() => setTestModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-sm text-slate-700">Category</label>
                <select value={testForm.category} onChange={(e)=>setTestForm(f=>({...f,category:e.target.value}))} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2 bg-white">
                  <option value="" disabled>Select category</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-slate-700">Score</label>
                  <input type="number" value={testForm.score} onChange={(e)=>setTestForm(f=>({...f,score:e.target.value}))} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-slate-700">Date & Time</label>
                  <input type="datetime-local" value={testForm.date} onChange={(e)=>setTestForm(f=>({...f,date:e.target.value}))} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-slate-700">Time Spent (min)</label>
                  <input type="number" value={testForm.timeSpent} onChange={(e)=>setTestForm(f=>({...f,timeSpent:e.target.value}))} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-slate-700">Total Questions</label>
                  <input type="number" value={testForm.totalQuestions} onChange={(e)=>setTestForm(f=>({...f,totalQuestions:e.target.value}))} className="mt-1 w-full border border-slate-300 rounded-md px-3 py-2" />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={()=>setTestModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-md">Cancel</button>
              <button onClick={saveTest} className="px-4 py-2 bg-green-600 text-white rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Solutions Modal (Admin view) */}
      {solutionsOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
            {/* Sticky header inside modal */}
            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">Test Solutions</h3>
                <button onClick={() => setSolutionsOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-1 text-sm text-slate-600">
                <span className="mr-4">Test: <span className="font-semibold text-slate-800">{solutionsMeta.title || solutionsMeta.category || (solutionsMeta.paperId ? solutionsMeta.paperId : '—')}</span></span>
                <span>Date: <span className="font-semibold text-slate-800">{solutionsMeta.date ? new Date(solutionsMeta.date).toLocaleDateString() : '—'}</span></span>
              </div>
              {/* Non-scrolling details */}
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium">Score: {solutionsMeta.score ?? '—'}</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium">Questions: {solutionsMeta.totalQuestions ?? solutionsQuestions.length ?? '—'}</span>
              </div>
            </div>
            {/* Scrollable content */}
            <div className="p-6 overflow-y-auto">
              {solutionsLoading && (
                <div className="text-center text-slate-500">Loading solutions...</div>
              )}
              {solutionsError && !solutionsLoading && (
                <div className="text-center text-red-500">{solutionsError}</div>
              )}
              {!solutionsLoading && !solutionsError && (
                <div className="space-y-6">
                  {solutionsQuestions.map((q, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-slate-50/30">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">Q{idx + 1}</span>
                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">✅ Correct Answer Available</span>
                      </div>
                      <p className="text-slate-800 font-medium mb-4">{q.question}</p>
                      <div className="space-y-2 mb-4">
                        {q.options.map((opt, oi) => {
                          const isCorrect = opt === q.answer;
                          const letter = String.fromCharCode(65 + oi);
                          return (
                            <div key={letter} className={`p-3 rounded-lg border-2 ${isCorrect ? 'bg-green-100 border-green-300 text-green-800' : 'bg-white border-slate-200 text-slate-700'}`}>
                              <div className="flex items-center gap-3">
                                <span className={`font-bold text-sm ${isCorrect ? 'text-green-700' : 'text-slate-500'}`}>{letter})</span>
                                <span className="flex-1">{opt}</span>
                                {isCorrect && <span className="text-green-600 font-bold">✅ Correct Answer</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <h4 className="font-semibold text-blue-800 mb-1">💡 Solution & Explanation:</h4>
                        <p className="text-blue-900">{q.explanation}</p>
                        <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded">
                          <span className="text-green-800 font-semibold">Answer: {q.answer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
