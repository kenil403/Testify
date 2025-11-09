import React, { useEffect, useState } from 'react';
import { ClipboardListIcon, ChartBarIcon, TrophyIcon, ChevronLeftIcon } from '../components/icons/Icons';
import { getUserTestHistory } from '../services/paperAssignment';
import { getPaper as getDbPaper } from '../api/papers';

const DashboardPage = ({ navigate, user }) => {
    const [recentTests, setRecentTests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [showTestDetails, setShowTestDetails] = useState(false);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState(null);
    const [detailsQuestions, setDetailsQuestions] = useState([]);
    const [detailsTitle, setDetailsTitle] = useState('');

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                setLoading(true);
                const localTests = (await getUserTestHistory(user?.email)) || [];
                const serverTests = user?.testHistory || [];
                const allTests = (localTests || []).filter(
                    (t) => !(t?.category && /practice/i.test(t.category))
                );
                serverTests.forEach((serverTest) => {
                    if (serverTest && serverTest.category && /practice/i.test(serverTest.category)) return;
                    const exists = allTests.some(
                        (localTest) =>
                            localTest.category === serverTest.category &&
                            localTest.score === serverTest.score &&
                            Math.abs(new Date(localTest.date) - new Date(serverTest.date)) < 60000
                    );
                    if (!exists) allTests.push(serverTest);
                });
                const seen = new Map();
                allTests.forEach((t) => {
                    if (!t) return;
                    const key =
                        t._id ||
                        t.id ||
                        t.testId ||
                        `${t.category || ''}_${t.score || ''}_${Math.round(new Date(t.date || 0).getTime() / 60000)}`;
                    if (!seen.has(key)) seen.set(key, t);
                });
                const deduped = Array.from(seen.values()).sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                if (!mounted) return;
                setRecentTests(deduped);
            } catch (err) {
                console.error('Failed to load test history', err);
                if (mounted) setError('Failed to load test history');
            } finally {
                if (mounted) setLoading(false);
            }
        }
        if (user?.email) load();
        return () => {
            mounted = false;
        };
    }, [user]);

    const total = recentTests.reduce((s, t) => s + (Number(t.score) || 0), 0);
    const average = recentTests.length ? Math.round((total / recentTests.length) * 100) / 100 : 0;
    const bestScore = recentTests.reduce((best, t) => {
        const s = Number(t.score);
        if (!isNaN(s)) return best === null ? s : Math.max(best, s);
        return best;
    }, null);

    const handleViewDetails = async (test) => {
        setSelectedTest(test);
        setShowTestDetails(true);
        setDetailsError(null);
        setDetailsQuestions([]);
        setDetailsTitle(test?.category || (test?.paperId ? String(test.paperId) : ''));
        if (test?.paperId && test?.category) {
            try {
                setDetailsLoading(true);
                const paper = await getDbPaper(test.category, test.paperId);
                if (paper && Array.isArray(paper.questions)) {
                    setDetailsQuestions(
                        paper.questions.map((q) => ({
                            question: q.question,
                            options: q.options,
                            answer: q.answer,
                            explanation: q.explanation,
                        }))
                    );
                    // Prefer the paper title if provided
                    if (paper.title) {
                        setDetailsTitle(paper.title);
                    }
                } else {
                    setDetailsError('Solutions not available for this attempt.');
                }
            } catch (e) {
                setDetailsError('Failed to load solutions.');
            } finally {
                setDetailsLoading(false);
            }
        } else {
            setDetailsError('Solutions not available for this attempt.');
        }
    };

    return (
        <div className="container mx-auto">
            <div className="mb-6">
                <button
                    onClick={() => navigate('home')}
                    className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
                >
                    <ChevronLeftIcon />
                </button>
            </div>
            <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}!</h1>
            <p className="text-lg text-slate-600 mb-10">Here's a summary of your performance.</p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                        <ClipboardListIcon />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Tests Taken</p>
                        <p className="text-2xl font-bold">{recentTests.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                        <ChartBarIcon />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Average Score</p>
                        <p className="text-2xl font-bold">{average}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        <TrophyIcon />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Best Score</p>
                        <p className="text-2xl font-bold">{bestScore === null ? '—' : bestScore}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Recent Test History</h2>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-8 text-center text-slate-500">Loading test history...</div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">{error}</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b">
                                    <th className="p-4 font-semibold">Test Category</th>
                                    <th className="p-4 font-semibold">Score</th>
                                    <th className="p-4 font-semibold">Date</th>
                                    <th className="p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTests.length > 0 ? (
                                    recentTests.map((test, idx) => {
                                        const key = test._id || test.id || test.testId || `${test.date || ''}_${idx}`;
                                        return (
                                            <tr key={key} className="border-b hover:bg-slate-50">
                                                <td className="p-4 font-medium">{test.category}</td>
                                                <td className="p-4">{test.score}</td>
                                                <td className="p-4 text-sm text-slate-500">{test.date ? new Date(test.date).toLocaleString() : '—'}</td>
                                                <td className="p-4">
                                                    <button onClick={() => handleViewDetails(test)} className="text-green-600 hover:underline font-semibold">
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-8 text-slate-500">
                                            You haven't taken any tests yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showTestDetails && selectedTest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col">
                        {/* Sticky header inside modal */}
                        <div className="p-6 border-b sticky top-0 bg-white z-10">
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    onClick={() => setShowTestDetails(false)}
                                    className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
                                >
                                    <ChevronLeftIcon />
                                    Back to Dashboard
                                </button>
                            </div>
                            <div className="text-center">
                                <h1 className="text-3xl font-extrabold text-slate-800">📖 Test Solutions</h1>
                                <p className="text-sm text-slate-500 mt-1 max-w-3xl mx-auto">Complete solutions with detailed explanations.</p>
                                <div className="mt-2 text-sm text-slate-600">
                                    <span className="mr-4">
                                        Test: <span className="font-semibold text-slate-800">{detailsTitle || '—'}</span>
                                    </span>
                                    <span>
                                        Date: <span className="font-semibold text-slate-800">{selectedTest.date ? new Date(selectedTest.date).toLocaleDateString() : '—'}</span>
                                    </span>
                                </div>
                                {/* Header remains non-scrolling; MCQs below will scroll */}
                            </div>
                        </div>

                        {/* Scrollable content area */}
                        <div className="p-8 overflow-y-auto">
                            {detailsLoading && (
                                <div className="text-center text-slate-500">Loading solutions...</div>
                            )}
                            {detailsError && !detailsLoading && (
                                <div className="text-center text-red-500">{detailsError}</div>
                            )}
                            {!detailsLoading && !detailsError && (
                                <div className="space-y-8">
                                    {detailsQuestions.map((question, index) => (
                                        <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50/30">
                                            {/* Question Header */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">Q{index + 1}</span>
                                                <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">✅ Correct Answer Available</span>
                                            </div>
                                            {/* Question */}
                                            <div className="mb-6">
                                                <p className="text-lg font-medium text-slate-800 leading-relaxed">{question.question}</p>
                                            </div>
                                            {/* Options */}
                                            <div className="space-y-3 mb-6">
                                                {question.options.map((option, optIndex) => {
                                                    const optionLetter = String.fromCharCode(65 + optIndex);
                                                    const isCorrectAnswer = option === question.answer;
                                                    return (
                                                        <div
                                                            key={option}
                                                            className={`p-3 rounded-lg border-2 transition-all ${
                                                                isCorrectAnswer
                                                                    ? 'bg-green-100 border-green-300 text-green-800'
                                                                    : 'bg-white border-slate-200 text-slate-700'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className={`font-bold text-sm ${isCorrectAnswer ? 'text-green-700' : 'text-slate-500'}`}>{optionLetter})</span>
                                                                <span className="flex-1">{option}</span>
                                                                {isCorrectAnswer && <span className="text-green-600 font-bold">✅ Correct Answer</span>}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {/* Explanation */}
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                                    <span>💡</span> Solution & Explanation:
                                                </h4>
                                                <p className="text-blue-900 leading-relaxed">{question.explanation}</p>
                                                <div className="mt-3 p-2 bg-green-100 border border-green-300 rounded">
                                                    <span className="text-green-800 font-semibold">Answer: {question.answer}</span>
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
};

export default DashboardPage;
