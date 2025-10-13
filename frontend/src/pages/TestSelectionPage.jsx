import React from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';

const TestSelectionPage = ({ navigate, setTestState }) => {
    return (
        <div className="container mx-auto text-center">
            <div className="mb-6">
                <button
                    onClick={() => navigate("home")}
                    className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
                >
                    <ChevronLeftIcon />
                </button>
            </div>
            <h1 className="text-4xl font-bold mb-4">Test Center</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">Choose a section to begin your practice test. Aptitude tests have 60 questions, while other tests have 10 questions each.</p>
            
            {/* Learning Section (Problem on Trains card removed) */}

            {/* Main Test Categories */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div 
                    onClick={() => { setTestState(prev => ({...prev, selectedCategory: 'Aptitude', returnPage: null })); navigate('test-instructions'); }} 
                    className="bg-white p-8 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-amber-400 group"
                >
                    <h2 className="text-2xl font-bold text-amber-800 mb-3">Aptitude</h2>
                    <p className="text-slate-600 mb-6">Test your skills in Arithmetic, Logical Reasoning, Data Interpretation and Mathematical Operations.</p>
                    <button className="w-full py-2 bg-amber-400 text-amber-900 font-bold rounded-lg group-hover:bg-amber-500 transition-colors">
                        Start Aptitude Test
                    </button>
                </div>

                {/* Section 2: Technical */}
                 <div 
                    onClick={() => { setTestState(prev => ({...prev, selectedCategory: 'Technical', returnPage: null })); navigate('test-instructions'); }} 
                    className="bg-white p-8 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-green-400 group"
                >
                    <h2 className="text-2xl font-bold text-green-700 mb-3">Technical</h2>
                    <p className="text-slate-600 mb-6">Challenge yourself with questions on C/C++, Java, data structures, and more.</p>
                    <button className="w-full py-2 bg-green-600 text-white font-bold rounded-lg group-hover:bg-green-700 transition-colors">
                        Start Technical Test
                    </button>
                </div>

                {/* Section 3: Departmental */}
                 <div 
                    onClick={() => navigate('department-selection')} 
                    className="bg-white p-8 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-400 group"
                >
                    <h2 className="text-2xl font-bold text-blue-700 mb-3">Courses</h2>
                    <p className="text-slate-600 mb-6">Take tests specific to your branch like Mechanical or Computer Engineering.</p>
                    <button className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg group-hover:bg-blue-600 transition-colors">
                        Select Course 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestSelectionPage;
