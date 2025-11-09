import React, { useState } from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';
import { getTechnicalPaperSet1, getTechnicalPaperSet2, getTechnicalPaperSet3, getTechnicalPaperSet4, getTechnicalPaperSet5, getTechnicalPaperSet6 } from '../data/TechnicalTestBank';

const TechnicalSolutionPage = ({ navigate }) => {
    const [selectedPaper, setSelectedPaper] = useState(1);
    
    const getPaperData = (paperNumber) => {
        switch(paperNumber) {
            case 1: return getTechnicalPaperSet1();
            case 2: return getTechnicalPaperSet2();
            case 3: return getTechnicalPaperSet3();
            case 4: return getTechnicalPaperSet4();
            case 5: return getTechnicalPaperSet5();
            case 6: return getTechnicalPaperSet6();
            default: return getTechnicalPaperSet1();
        }
    };
    
    const paper = getPaperData(selectedPaper);
    const bank = paper?.questions || [];

    return (
        <div className="container mx-auto min-h-screen flex flex-col">
            <div className="mb-6">
                <button
                    onClick={() => navigate('test-selection')}
                    className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
                >
                    <ChevronLeftIcon />
                </button>
            </div>
            {/* Header and selection (non-scrolling region) */}
            <div>
                {/* Sticky header for title/intro */}
                <div className="text-center sticky top-0 bg-white z-10 pt-4 pb-4 border-b mb-4">
                    <h1 className="text-5xl font-extrabold text-slate-800">🧪 Technical Solutions</h1>
                    <p className="text-lg text-slate-500 mt-4 max-w-3xl mx-auto">
                        Complete question papers with answers and detailed explanations. Select a paper set to review.
                    </p>
                </div>

                {/* Paper Selection */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Select Paper Set:</h2>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((paperNum) => (
                            <button
                                key={paperNum}
                                onClick={() => setSelectedPaper(paperNum)}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                    selectedPaper === paperNum
                                        ? 'bg-green-100 border-green-500 text-green-800 font-bold'
                                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                <div className="text-lg font-semibold">Paper Set {paperNum}</div>
                                <div className="text-sm opacity-75">60 Questions</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Technical Paper Set {selectedPaper} - Solutions
                    </h2>
                    <p className="text-slate-600 mt-2">
                        Review all {bank.length} questions with detailed explanations
                    </p>
                </div>
            </div>

            {/* Scrollable MCQ content (fills remaining height) */}
            <div className="flex-1 min-h-0">
                <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
                    <div className="p-8 overflow-y-auto">
                        <div className="space-y-8">
                    {bank.map((mcq, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50/30">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">Q{mcq.id || index + 1}</span>
                                <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">✅ Correct Answer Available</span>
                            </div>
                            <div className="mb-6">
                                <p className="text-lg font-medium text-slate-800 leading-relaxed">{mcq.question}</p>
                            </div>
                            <div className="space-y-3 mb-6">
                                {mcq.options.map((option, optIndex) => {
                                    const optionLetter = String.fromCharCode(65 + optIndex);
                                    const isCorrect = option === mcq.answer;
                                    return (
                                        <div key={option} className={`p-3 rounded-lg border-2 ${isCorrect ? 'bg-green-100 border-green-300 text-green-800' : 'bg-white border-slate-200 text-slate-700'}`}>
                                            <div className="flex items-center gap-3">
                                                <span className={`font-bold text-sm ${isCorrect ? 'text-green-700' : 'text-slate-500'}`}>{optionLetter})</span>
                                                <span className="flex-1">{option}</span>
                                                {isCorrect && <span className="text-green-600 font-bold">✅ Correct Answer</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2"><span>💡</span> Solution & Explanation:</h4>
                                <p className="text-blue-900 leading-relaxed">{mcq.explanation}</p>
                            </div>
                        </div>
                    ))}
                    {bank.length === 0 && (
                        <div className="text-center text-slate-600">No solutions available for this paper yet.</div>
                    )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicalSolutionPage;
