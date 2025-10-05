import React from 'react';
import { LightBulbIcon, BrainIcon, ClipboardListIcon, DatabaseIcon, NetworkIcon, TestIcon, WrenchIcon, BriefcaseIcon, ChevronLeftIcon } from '../components/icons/Icons';

const LearnPage = ({ navigate }) => {
    const mainCategories = [
        { name: 'Aptitude', description: 'Sharpen your quantitative and problem-solving skills.', icon: <LightBulbIcon />, color: 'amber' },
        { name: 'Reasoning', description: 'Enhance your analytical and logical thinking abilities.', icon: <BrainIcon />, color: 'purple' },
        { name: 'Programming', description: 'Master essential languages for technical interviews.', icon: <ClipboardListIcon />, color: 'green' },
        { name: 'Database', description: 'Understand SQL, NoSQL, and core database concepts.', icon: <DatabaseIcon />, color: 'cyan' },
        { name: 'Networking', description: 'Learn about network layers, protocols, and models.', icon: <NetworkIcon />, color: 'indigo' },
        { name: 'Software Testing', description: 'Explore manual, automation, and lifecycle concepts.', icon: <TestIcon />, color: 'rose' },
        { name: 'Engineering', description: 'Explore core subjects for your specific branch.', icon: <WrenchIcon />, color: 'blue' },
        { name: 'Interview', description: 'Prepare for HR, technical rounds, and resume building.', icon: <BriefcaseIcon />, color: 'gray' }
    ];

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
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-slate-800">Learning Center</h1>
                <p className="text-lg text-slate-500 mt-4 max-w-3xl mx-auto">
                    Welcome to the central hub for all your learning materials. Dive into our curated content designed to help you excel. Select a category below to start exploring the topics.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {mainCategories.map(cat => (
                    <div 
                        key={cat.name} 
                        onClick={() => navigate(`learn-${encodeURIComponent(cat.name)}`)}
                        className={`bg-white p-8 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-8 border-${cat.color}-500 group`}
                    >
                        <div className={`text-${cat.color}-500 mb-4`}>
                            {cat.icon}
                        </div>
                        <h2 className={`text-2xl font-bold text-slate-800 mb-3`}>{cat.name}</h2>
                        <p className="text-slate-600 mb-6">{cat.description}</p>
                        <span className={`font-bold text-sm text-${cat.color}-600 group-hover:underline`}>
                            Explore Section &rarr;
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LearnPage;
