import React from 'react';
import { ClipboardListIcon, ChartBarIcon, TrophyIcon, ChevronLeftIcon } from '../components/icons/Icons';

const DashboardPage = ({ navigate, user }) => {
    const recentTests = user.testHistory || [];
    return (
         <div className="container mx-auto">
            <div className="mb-6">
                <button
                    onClick={() => navigate("home")}
                    className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
                >
                    <ChevronLeftIcon />
        
                </button>
            </div>
            <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
            <p className="text-lg text-slate-600 mb-10">Here's a summary of your performance.</p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"><div className="bg-green-100 p-3 rounded-full text-green-600"><ClipboardListIcon/></div><div><p className="text-sm text-slate-500">Tests Taken</p><p className="text-2xl font-bold">{recentTests.length}</p></div></div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"><div className="bg-amber-100 p-3 rounded-full text-amber-600"><ChartBarIcon/></div><div><p className="text-sm text-slate-500">Average Score</p><p className="text-2xl font-bold">76%</p></div></div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"><div className="bg-blue-100 p-3 rounded-full text-blue-600"><TrophyIcon/></div><div><p className="text-sm text-slate-500">Best Rank</p><p className="text-2xl font-bold">#3</p></div></div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Recent Test History</h2>
                <div className="overflow-x-auto">
                     <table className="w-full text-left">
                        <thead><tr className="bg-slate-50 border-b"><th className="p-4 font-semibold">Test Category</th><th className="p-4 font-semibold">Score</th><th className="p-4 font-semibold">Rank</th><th className="p-4 font-semibold">Actions</th></tr></thead>
                        <tbody>
                             {recentTests.length > 0 ? recentTests.map(test => (
                                <tr key={test.id} className="border-b hover:bg-slate-50">
                                    <td className="p-4 font-medium">{test.category}</td>
                                    <td className="p-4">{test.score}</td>
                                    <td className="p-4 font-semibold text-green-700">#{test.rank}</td>
                                    <td className="p-4"><button className="text-green-600 hover:underline font-semibold">View Details</button></td>
                                </tr>
                            )) : ( <tr><td colSpan="4" className="text-center p-8 text-slate-500">You haven't taken any tests yet.</td></tr> )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
