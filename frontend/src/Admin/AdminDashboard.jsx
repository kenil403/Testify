import React, { useEffect, useMemo, useState } from 'react';
import { listUsers, updateUser, deleteUser as deleteUserApi, createUser } from '../api/admin';
import { getToken } from '../api/auth';
import OverviewTab from './tabs/OverviewTab';
import UsersTab from './tabs/UsersTab';
import TestsTab from './tabs/TestsTab';
import UserForm from './components/UserForm';

 

const AdminDashboard = ({ navigate, adminUser, handleLogout }) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('users'); // tabs: 'overview' | 'users'
    const [createOpen, setCreateOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [q, setQ] = useState('');
    const [department, setDepartment] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 10;
    

        useEffect(() => {
            let ignore = false;
            async function load() {
                setLoading(true);
                try {
                    const data = await listUsers({ q, department, page, limit: pageSize });
                    if (!ignore) {
                        setUsers((data && data.users) || []);
                        setError('');
                    }
                } catch (e) {
                    if (!ignore) setError('Failed to load users from server');
                } finally {
                    setLoading(false);
                }
            }
            load();
            return () => {
                ignore = true;
            };
    }, [q, department, page, activeTab]);

    // Lightweight polling to keep Admin Dashboard fresh without manual refresh
    useEffect(() => {
        let cancelled = false;
        // Poll every 3 seconds for near-realtime updates
        const intervalId = setInterval(async () => {
            try {
                // Only poll when admin is authenticated (token presence)
                if (!getToken()) return;
                const data = await listUsers({ q, department, page, limit: pageSize });
                if (cancelled) return;
                const next = (data && data.users) || [];
                // Always set latest snapshot so analytics reflect newest tests immediately
                setUsers(next);
            } catch (e) {
                // silent poll errors
            }
        }, 3000);
        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, [q, department, page, pageSize, users]);

    const filtered = useMemo(() => {
        let list = users;
        if (q.trim()) {
            const qq = q.trim().toLowerCase();
            list = list.filter(
                (u) =>
                    u.name?.toLowerCase().includes(qq) ||
                    u.email?.toLowerCase().includes(qq) ||
                    (u.mobile || '').toLowerCase().includes(qq)
            );
        }
        if (department) list = list.filter((u) => u.department === department);
        return list;
    }, [users, q, department]);

    const paged = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page]);

    const stats = useMemo(() => {
        // Backend already filters out Admin users, so all users here are Students
        const students = users.length;
        const avg = students > 0 ? Math.round((users.reduce((s, u) => s + (u.averageScore || 0), 0) / students) * 10) / 10 : 0;
        const activeUsers = users.filter(u => u.lastLogin && new Date(u.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
        return { students, avg, activeUsers };
    }, [users]);

    // Comprehensive analytics
        const analytics = useMemo(() => {
            // Exclude Admin users from test analytics
            const testUsers = users.filter((u) => u.role !== 'Admin');
            const allTests = testUsers.flatMap((u) => (u.testHistory || []).map((t) => ({ ...t, user: u })));
            const totalTests = allTests.length;
            const avgScore = totalTests > 0 ? Math.round((allTests.reduce((s, t) => s + (t.score || 0), 0) / totalTests) * 10) / 10 : 0;
        const totalTimeSpent = allTests.reduce((s, t) => s + (t.timeSpent || 0), 0);
        
        // Category performance
            const byCat = new Map();
            for (const t of allTests) {
            const bucket = byCat.get(t.category) || { sum: 0, count: 0, points: [], timeSpent: 0 };
                bucket.sum += t.score || 0;
                bucket.count += 1;
            bucket.timeSpent += t.timeSpent || 0;
                bucket.points.push({ d: new Date(t.date).getTime(), s: t.score || 0 });
                byCat.set(t.category, bucket);
            }
        
            const categories = Array.from(byCat.entries()).map(([category, v]) => {
                const sorted = v.points.sort((a, b) => a.d - b.d);
                return {
                    category,
                    avg: Math.round((v.sum / v.count) * 10) / 10,
                    count: v.count,
                avgTimeSpent: Math.round(v.timeSpent / v.count),
                    series: sorted.map((p) => p.s)
                };
            });
            categories.sort((a, b) => b.count - a.count);
        
        // Department performance
        const byDept = new Map();
        for (const u of testUsers) {
            if (u.department && u.testHistory?.length > 0) {
                const bucket = byDept.get(u.department) || { sum: 0, count: 0, users: 0 };
                bucket.sum += u.averageScore || 0;
                bucket.count += 1;
                bucket.users += 1;
                byDept.set(u.department, bucket);
            }
        }
        
        const departments = Array.from(byDept.entries()).map(([dept, v]) => ({
            department: dept,
            avgScore: Math.round((v.sum / v.count) * 10) / 10,
            userCount: v.users,
            testCount: testUsers.filter(u => u.department === dept).reduce((s, u) => s + (u.totalTests || 0), 0)
        }));
        departments.sort((a, b) => b.avgScore - a.avgScore);
        
        // Recent activities
            const recent = allTests
                .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10)
                .map((t) => ({
                    userName: t.user?.name || t.user?.email || 'User',
                    category: t.category,
                    score: t.score,
                date: t.date,
                timeSpent: t.timeSpent,
                department: t.user?.department
                }));
        
        // Performance trends (last 14 days)
            const today = new Date();
            const dayKey = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0,10);
            const keys = Array.from({ length: 14 }, (_, i) => {
                const d = new Date(today);
                d.setDate(today.getDate() - (13 - i));
                return dayKey(d);
            });
        
            const grouped = new Map();
            for (const t of allTests) {
                const d = new Date(t.date);
                const k = dayKey(d);
            const g = grouped.get(k) || { sum: 0, count: 0, timeSpent: 0 };
                g.sum += t.score || 0;
                g.count += 1;
            g.timeSpent += t.timeSpent || 0;
                grouped.set(k, g);
            }
        
            const dailyCounts = keys.map((k) => grouped.get(k)?.count || 0);
            const dailyAvgScores = keys.map((k) => {
                const g = grouped.get(k);
                return g && g.count > 0 ? Math.round((g.sum / g.count) * 10) / 10 : 0;
            });
        const dailyAvgTime = keys.map((k) => {
            const g = grouped.get(k);
            return g && g.count > 0 ? Math.round(g.timeSpent / g.count) : 0;
        });
        
        // Top performers
        const topPerformers = testUsers
            .filter(u => u.totalTests > 0)
            .sort((a, b) => b.averageScore - a.averageScore)
            .slice(0, 5);
        
        // Improvement leaders
        const improvementLeaders = testUsers
            .filter(u => u.improvement > 0)
            .sort((a, b) => b.improvement - a.improvement)
            .slice(0, 5);
        
        return { 
            totalTests, 
            avgScore, 
            totalTimeSpent,
            categories, 
            departments,
            recent, 
            dailyCounts, 
            dailyAvgScores,
            dailyAvgTime,
            topPerformers,
            improvementLeaders
        };
        }, [users]);

    function openEdit(u) {
        setSelected(u);
        setEditOpen(true);
        setError('');
    }

    async function handleSave(changes) {
        setSaving(true);
        try {
            const updated = await updateUser(selected._id, changes);
            setUsers((prev) => prev.map((u) => (u._id === updated._id ? { ...u, ...updated } : u)));
            setEditOpen(false);
        } catch (e) {
            setError('Failed to save user changes');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(userId) {
        if (!window.confirm('Delete this user? This cannot be undone.')) return;
        try {
            await deleteUserApi(userId);
            setUsers((prev) => prev.filter((u) => u._id !== userId));
            if (selected?._id === userId) setSelected(null);
        } catch (e) {
            setError('Failed to delete user');
        }
    }

    async function handleCreate(payload) {
        setSaving(true);
        try {
            const created = await createUser(payload);
            const computed = {
                ...created,
                totalTests: (created.testHistory || []).length,
                averageScore:
                    (created.testHistory || []).length > 0
                        ? Math.round((created.testHistory.reduce((s, t) => s + (t.score || 0), 0) / created.testHistory.length) * 10) / 10
                        : 0
            };
            setUsers((prev) => [computed, ...prev]);
            setCreateOpen(false);
            setSelected(computed);
            setActiveTab('users');
            setError('');
        } catch (e) {
            setError('Failed to create user');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-white">
            {/* Modern Header */}
            <header className="bg-white/80 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-12">
                        {/* Logo and Brand */}
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">{adminUser?.name?.charAt(0)?.toUpperCase() || 'T'}</span>
                            </div>
                        <div>
                                <h1 className="text-lg font-bold text-slate-900">{adminUser?.name || 'Admin'}</h1>
                                <p className="text-xs text-slate-500">Administrator</p>
                        </div>
                    </div>

                        {/* Search and Actions */}
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block">
                                <div className="relative">
                        <input
                                        type="text"
                            value={q}
                            onChange={(e) => { setQ(e.target.value); setPage(1); setActiveTab('users'); }}
                            placeholder="Search users..."
                                        className="w-56 pl-10 pr-3 py-1.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                    </div>
                                </div>
                    </div>
                            
            {getToken() && (
                        <button
                            onClick={() => { setSelected(null); setCreateOpen(true); setError(''); setActiveTab('users'); }}
                            className="hidden sm:inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                        >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            New User
                        </button>
                    )}
                            
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors text-sm"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                    </div>
                </div>
            </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Horizontal Navigation */}
                <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl border border-slate-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                        <h2 className="text-lg font-semibold text-slate-900">{adminUser?.name ? `${adminUser.name}'s Dashboard` : 'Admin Dashboard'}</h2>
                        <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm text-slate-600 overflow-x-auto">
                            <div className="flex items-center space-x-1 md:space-x-2 whitespace-nowrap">
                                <span>Users:</span>
                                <span className="font-semibold text-slate-900">{stats.total}</span>
                    </div>
                            <div className="flex items-center space-x-1 md:space-x-2 whitespace-nowrap">
                                <span>Active:</span>
                                <span className="font-semibold text-green-600">{stats.activeUsers}</span>
                            </div>
                            <div className="flex items-center space-x-1 md:space-x-2 whitespace-nowrap">
                                <span>Avg:</span>
                                <span className="font-semibold text-amber-600">{stats.avg}%</span>
                            </div>
                            <div className="flex items-center space-x-1 md:space-x-2 whitespace-nowrap">
                                <span>Tests:</span>
                                <span className="font-semibold text-slate-900">{analytics.totalTests}</span>
                            </div>
                        </div>
                    </div>
                    
                    <nav className="flex space-x-2 overflow-x-auto py-1">
                        <button
                            onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
                            aria-current={activeTab === 'overview' ? 'page' : undefined}
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition shadow-sm ${
                                activeTab === 'overview'
                                    ? 'bg-white text-green-700 border-green-300 ring-1 ring-green-100'
                                    : 'bg-white/60 text-slate-700 border-slate-200 hover:bg-white hover:text-slate-900'
                            }`}
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H7a2 2 0 00-2 2v6m8 0V9a2 2 0 012-2h0a2 2 0 012 2v10m-6 0a2 2 0 002 2h0a2 2 0 002-2" />
                            </svg>
                            Overview
                        </button>
                        <button
                            onClick={() => { setActiveTab('users'); setSidebarOpen(false); }}
                            aria-current={activeTab === 'users' ? 'page' : undefined}
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition shadow-sm ${
                                activeTab === 'users'
                                    ? 'bg-white text-green-700 border-green-300 ring-1 ring-green-100'
                                    : 'bg-white/60 text-slate-700 border-slate-200 hover:bg-white hover:text-slate-900'
                            }`}
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-1a6 6 0 00-9-5.197M9 20H3v-1a6 6 0 0112 0v1M9 7a4 4 0 110-8 4 4 0 010 8z" />
                            </svg>
                            Users
                        </button>
                        <button
                            onClick={() => { setActiveTab('tests'); setSidebarOpen(false); }}
                            aria-current={activeTab === 'tests' ? 'page' : undefined}
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition shadow-sm ${
                                activeTab === 'tests'
                                    ? 'bg-white text-green-700 border-green-300 ring-1 ring-green-100'
                                    : 'bg-white/60 text-slate-700 border-slate-200 hover:bg-white hover:text-slate-900'
                            }`}
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M8 7h8l2 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z" />
                            </svg>
                            Test Insights
                        </button>
                        <button
                            onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }}
                            aria-current={activeTab === 'profile' ? 'page' : undefined}
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition shadow-sm ${
                                activeTab === 'profile'
                                    ? 'bg-white text-green-700 border-green-300 ring-1 ring-green-100'
                                    : 'bg-white/60 text-slate-700 border-slate-200 hover:bg-white hover:text-slate-900'
                            }`}
                        >
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                        </button>
                    </nav>
                    </div>

                {/* Main Content */}
                <main className="space-y-8">
                    {activeTab === 'overview' && <OverviewTab stats={stats} analytics={analytics} />}
                    {activeTab === 'users' && <UsersTab canManage={true} users={users} setUsers={setUsers} filtered={filtered} paged={paged} selected={selected} setSelected={setSelected} openEdit={openEdit} handleDelete={handleDelete} loading={loading} error={error} q={q} setQ={setQ} department={department} setDepartment={setDepartment} page={page} setPage={setPage} pageSize={pageSize} createOpen={createOpen} setCreateOpen={setCreateOpen} setError={setError} />}
                    {activeTab === 'tests' && <TestsTab analytics={analytics} />}
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                            <div className="max-w-3xl mx-auto">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                        {adminUser?.name?.charAt(0)?.toUpperCase() || 'A'}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">{adminUser?.name || 'Admin'}</h2>
                                        <p className="text-slate-500">Administrator Account</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Full Name</label>
                                            <div className="mt-1 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                                                <p className="text-slate-900">{adminUser?.name || 'N/A'}</p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Email Address</label>
                                            <div className="mt-1 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                                                <p className="text-slate-900">{adminUser?.email || 'N/A'}</p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Mobile Number</label>
                                            <div className="mt-1 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                                                <p className="text-slate-900">{adminUser?.mobile || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Role</label>
                                            <div className="mt-1 px-4 py-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                                <p className="text-emerald-700 font-semibold">{adminUser?.role || 'Admin'}</p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Account Created</label>
                                            <div className="mt-1 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                                                <p className="text-slate-900">
                                                    {adminUser?.createdAt 
                                                        ? new Date(adminUser.createdAt).toLocaleDateString('en-US', { 
                                                            year: 'numeric', 
                                                            month: 'long', 
                                                            day: 'numeric' 
                                                        })
                                                        : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">User ID</label>
                                            <div className="mt-1 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                                                <p className="text-slate-900 font-mono text-xs break-all">{adminUser?._id || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <div className="flex items-start space-x-3">
                                        <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <h3 className="text-sm font-semibold text-amber-900">Administrator Privileges</h3>
                                            <p className="text-sm text-amber-700 mt-1">
                                                As an administrator, all your actions (creating, updating, or deleting users) are logged and tracked in the system for security and audit purposes.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
                                    </div>

            {/* Modals */}
            {editOpen && selected && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <h3 className="text-xl font-semibold text-slate-900">Edit User</h3>
                            <button onClick={() => setEditOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                                </div>
                        <div className="p-6">
                        <UserForm initial={selected} onCancel={() => setEditOpen(false)} onSave={handleSave} saving={saving} />
                                    </div>
                                </div>
                                </div>
            )}
            
            {createOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <h3 className="text-xl font-semibold text-slate-900">Create New User</h3>
                            <button onClick={() => setCreateOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                                </div>
                        <div className="p-6">
                        <UserForm initial={null} onCancel={() => setCreateOpen(false)} onSave={handleCreate} saving={saving} />
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

// Overview Tab Component