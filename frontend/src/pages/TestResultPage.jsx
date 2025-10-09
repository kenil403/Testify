import React, { useState } from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';
import { sampleMCQs } from '../data/sampleMCQs';
import { topicQuestionBank } from '../data/topicQuestionBank';
import { getUserAssignedPaper, recordTestCompletion } from '../services/paperAssignment';

const TestResultPage = ({ navigate, testState, resetTest, currentUser }) => {
    const { answers, score, selectedCategory, testQuestions } = testState;
    const markedForReview = testState?.markedForReview || [];
    
    // Record test completion when component mounts
    React.useEffect(() => {
        if (currentUser && selectedCategory === 'Aptitude' && score !== undefined) {
            const currentPaper = localStorage.getItem(`user_${currentUser.email}_current_paper`) || 'paper1';
            
            // Check if this test is already recorded to avoid duplicates
            const testHistoryKey = `user_${currentUser.email}_test_history`;
            const existingTests = JSON.parse(localStorage.getItem(testHistoryKey) || '[]');
            
            // Only record if this test hasn't been recorded yet
            const isAlreadyRecorded = existingTests.some(test => 
                test.testId === testState.testId || 
                (test.paper === currentPaper && test.category === selectedCategory && 
                 Math.abs(new Date(test.date) - new Date()) < 60000) // Within 1 minute
            );
            
            if (!isAlreadyRecorded) {
                recordTestCompletion(currentUser.email, currentPaper, score, selectedCategory, testState.testId);
            }
        }
    }, [currentUser, selectedCategory, score]);
    
    // Use the exact questions that were used in the test
    const getTestBank = () => {
        if (testQuestions && Array.isArray(testQuestions) && testQuestions.length > 0) {
            return testQuestions; // Use the exact questions from the test
        }
        // Fallback to fresh questions if testQuestions not available
        if (selectedCategory === 'Aptitude') {
            return topicQuestionBank[selectedCategory](currentUser?.email);
        }
        return topicQuestionBank[selectedCategory] || sampleMCQs;
    };
    
    const bankData = getTestBank() || [];
    const [showSolutions, setShowSolutions] = useState(false);
    const answeredCount = (answers || []).filter(a => a !== null).length;
    const isTechnical = (selectedCategory === 'Technical');

    if (showSolutions) {
        return (
             <div className="container mx-auto">
                 <button onClick={() => setShowSolutions(false)} className="p-2 rounded-full hover:bg-slate-200 transition-colors mb-8">
                    <ChevronLeftIcon />
                </button>
                
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-slate-800">{isTechnical ? '🧪 Technical Solutions' : '📖 Aptitude Solutions'}</h1>
                    <p className="text-lg text-slate-500 mt-4 max-w-3xl mx-auto">
                        Complete question paper with answers and detailed explanations. Review all {bankData.length} questions with solutions.
                    </p>
                    <div className="mt-4 text-sm text-slate-600">
                        <span className="mr-4">Answered: <span className="font-semibold text-slate-800">{answeredCount}</span> / {bankData.length}</span>
                        <span>Correct: <span className="font-semibold text-green-700">{score}</span></span>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="space-y-8">
                        {bankData.map((mcq, index) => (
                            <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50/30">
                                {/* Question Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                                        Q{index + 1}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                                        ✅ Correct Answer Available
                                    </span>
                                    {markedForReview[index] && (
                                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-amber-100 text-amber-800">
                                            🔖 Marked for Review
                                        </span>
                                    )}
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
                                        const userAnswer = answers[index];
                                        const isUserSelection = userAnswer === option;
                                        const isUserWrongSelection = isUserSelection && !isCorrectAnswer;
                                        
                                        return (
                                            <div 
                                                key={option} 
                                                className={`p-3 rounded-lg border-2 transition-all ${
                                                    isCorrectAnswer 
                                                        ? 'bg-green-100 border-green-300 text-green-800' 
                                                        : isUserWrongSelection
                                                            ? 'bg-red-100 border-red-300 text-red-800'
                                                            : 'bg-white border-slate-200 text-slate-700'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`font-bold text-sm ${
                                                        isCorrectAnswer ? 'text-green-700' : isUserWrongSelection ? 'text-red-700' : 'text-slate-500'
                                                    }`}>
                                                        {optionLetter})
                                                    </span>
                                                    <span className="flex-1">{option}</span>
                                                    {isCorrectAnswer && (
                                                        <span className="text-green-600 font-bold">
                                                            ✅ Correct Answer
                                                        </span>
                                                    )}
                                                    {!isUserWrongSelection && isUserSelection && isCorrectAnswer && (
                                                        <span className="text-green-700 font-semibold">✓ Your Answer</span>
                                                    )}
                                                    {isUserWrongSelection && (
                                                        <span className="text-red-600 font-bold">
                                                            ✗ Your Answer
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
                        {bankData.length === 0 && (
                            <div className="text-center text-slate-600">No solutions available for this attempt.</div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto text-center max-w-2xl">
            <div className="bg-white p-10 rounded-xl shadow-2xl">
                <h1 className="text-4xl font-extrabold text-green-700 mb-2">Test Complete!</h1>
                <p className="text-lg text-slate-600 mb-8">Here is your score report.</p>
                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-8 my-8 inline-block">
                    <p className="text-xl text-amber-800">You Scored</p>
                    <p className="text-7xl font-bold text-amber-900">{score}<span className="text-4xl">/{bankData.length}</span></p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button 
                        onClick={() => setShowSolutions(true)} 
                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                    >
                        View Solutions
                    </button>
                    <button
                        onClick={() => {
                            resetTest();
                            // Always redirect to test-selection for Technical test
                            if (testState?.selectedCategory === 'Technical') {
                                navigate('test-selection');
                            } else {
                                navigate(testState && testState.returnPage ? testState.returnPage : 'test-selection');
                            }
                        }}
                        className="px-6 py-3 bg-slate-200 text-slate-800 font-bold rounded-lg hover:bg-slate-300"
                    >
                        Take Another Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestResultPage;