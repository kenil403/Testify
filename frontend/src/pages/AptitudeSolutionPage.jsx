import React from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';
import { getPaperSet1 } from '../data/aptitudeTestBank';

const AptitudeSolutionPage = ({ navigate }) => {
    // Get Paper Set 1 for solutions
    const aptitudePaper = getPaperSet1();
    const bank = aptitudePaper.questions;

    return (
        <div className="container mx-auto">
            <div className="mb-6">
                <button
                    onClick={() => navigate('test-selection')}
                    className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
                >
                    <ChevronLeftIcon />
                </button>
            </div>
            
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-slate-800">📖 Aptitude Solutions</h1>
                <p className="text-lg text-slate-500 mt-4 max-w-3xl mx-auto">
                    Complete question paper with answers and detailed explanations. Review all 60 questions with solutions.
                </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
                
                <div className="space-y-8">
                    {bank.map((mcq, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50/30">
                            {/* Question Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                                    Q{index + 1}
                                </span>
                                <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                                    ✅ Correct Answer Available
                                </span>
                            </div>

                            {/* Question */}
                            <div className="mb-6">
                                <p className="text-lg font-medium text-slate-800 leading-relaxed">
                                    {mcq.question}
                                </p>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 mb-6">
                                {mcq.options.map((option, optIndex) => {
                                    const optionLetter = String.fromCharCode(65 + optIndex); // A, B, C, D
                                    const isCorrectAnswer = option === mcq.answer;
                                    
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
                                                <span className={`font-bold text-sm ${
                                                    isCorrectAnswer ? 'text-green-700' : 'text-slate-500'
                                                }`}>
                                                    {optionLetter})
                                                </span>
                                                <span className="flex-1">{option}</span>
                                                {isCorrectAnswer && (
                                                    <span className="text-green-600 font-bold">
                                                        ✅ Correct Answer
                                                    </span>
                                                )}
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
                                <p className="text-blue-900 leading-relaxed">
                                    {mcq.explanation}
                                </p>
                                
                                {/* Show Answer Highlight */}
                                <div className="mt-3 p-2 bg-green-100 border border-green-300 rounded">
                                    <span className="text-green-800 font-semibold">
                                        Answer: {mcq.answer}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
};

export default AptitudeSolutionPage;