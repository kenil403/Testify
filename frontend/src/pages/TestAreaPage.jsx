import React, { useState, useEffect } from 'react';
import { sampleMCQs } from '../data/sampleMCQs';
import { topicQuestionBank } from '../data/topicQuestionBank';

const TestAreaPage = ({ navigate, setTestState, testState, addTestResult, selectedCategory, currentUser }) => {
    // Always use the correct MCQs for Problems on Trains Practice
    const deriveBank = () => {
        if (selectedCategory === 'Problem on Trains Practice') {
            let trainsBank = topicQuestionBank[selectedCategory]();
            // If for any reason the bank is empty, fallback to the uploaded MCQs directly
            if (!trainsBank || trainsBank.length !== 30) {
                try {
                    const { practiceTests } = require('../data/practiceTestBank');
                    if (practiceTests && practiceTests['Problem on Trains'] && practiceTests['Problem on Trains'].questions) {
                        trainsBank = practiceTests['Problem on Trains'].questions.map(q => ({
                            question: q.question,
                            options: q.options,
                            answer: q.answer,
                            explanation: q.explanation
                        }));
                    }
                } catch (e) {}
            }
            // If still not found, show a message instead of rendering nothing
            if (!trainsBank || trainsBank.length === 0) {
                return [{
                    question: "Practice test for Problems on Trains is not available. Please contact admin.",
                    options: [],
                    answer: "",
                    explanation: "No questions found."
                }];
            }
            return trainsBank;
        }
        if (testState?.testQuestions && Array.isArray(testState.testQuestions) && testState.testQuestions.length > 0) {
            return testState.testQuestions;
        }
        if (selectedCategory === 'Aptitude') {
            return topicQuestionBank[selectedCategory](currentUser?.email);
        }
        return topicQuestionBank[selectedCategory] || sampleMCQs;
    };
    
    const bank = deriveBank();
    const { currentQuestion, answers, markedForReview } = testState;
    
    // Set time based on test type: 60 minutes for aptitude, 1 minute per question for others
    const totalTime = selectedCategory === 'Aptitude' ? 60 * 60 : 
                     selectedCategory === 'Problem on Trains Practice' ? 30 * 60 : 
                     60 * bank.length;
    const [timeLeft, setTimeLeft] = useState(totalTime);

    // Store test questions when test starts if not yet stored
    useEffect(() => {
        if (!testState.testQuestions || (testState.testQuestions && testState.testQuestions.length !== bank.length)) {
            setTestState(prev => ({ ...prev, testQuestions: bank }));
        }
    }, [bank, testState.testQuestions]);

    useEffect(() => {
        if(timeLeft === 0) { handleSubmit(); return; };
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Ensure arrays match bank length when topic changes
    useEffect(() => {
        if (answers.length !== bank.length || markedForReview.length !== bank.length) {
            setTestState(prev => ({
                ...prev,
                currentQuestion: 0,
                answers: Array(bank.length).fill(null),
                markedForReview: Array(bank.length).fill(false)
            }));
        }
    }, [bank.length]);

    const handleOptionSelect = (option) => {
        const newAnswers = [...answers];
        // Toggle selection: select option, or deselect if clicking the same option again
        newAnswers[currentQuestion] = answers[currentQuestion] === option ? null : option;
        setTestState(prev => ({ ...prev, answers: newAnswers }));
    };
    
    const handleMarkForReview = () => {
        const newMarked = [...markedForReview];
        newMarked[currentQuestion] = !newMarked[currentQuestion];
        setTestState(prev => ({...prev, markedForReview: newMarked}));
    };
    
    const changeQuestion = (index) => {
        if(index >= 0 && index < bank.length){
            setTestState(prev => ({ ...prev, currentQuestion: index }));
        }
    };
    
    const handleSubmit = (isEarlyTermination = false) => {
         let score = 0;
         // Always compute score as 1 point per correct answer
         answers.forEach((ans, index) => { if(ans === bank[index].answer) score++; });
         if(!isEarlyTermination) {
            addTestResult(selectedCategory, score);
         }
         
         setTestState(prev => ({...prev, finished: true, score: score}));
         navigate('test-result');
    };
    
    const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

    const currentMCQ = bank[currentQuestion];

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-xl font-bold">Question {currentQuestion + 1} of {bank.length}</h2>
                    <div className="text-lg font-mono bg-amber-200 text-amber-800 px-4 py-1 rounded-md">Time Left: {formatTime(timeLeft)}</div>
                </div>
                <p className="text-lg mb-8">{currentMCQ.question}</p>
                <div className="space-y-4">
                    {currentMCQ.options.map(option => (
                        <div
                            key={option}
                            role="radio"
                            aria-checked={answers[currentQuestion] === option}
                            tabIndex={0}
                            onClick={() => handleOptionSelect(option)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOptionSelect(option); } }}
                            className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${answers[currentQuestion] === option ? 'bg-green-100 border-green-500 ring-2 ring-green-500' : 'bg-slate-50 hover:bg-slate-100'}`}
                        >
                            <span className={`h-4 w-4 rounded-full border ${answers[currentQuestion] === option ? 'bg-green-600 border-green-600' : 'border-slate-300'}`}></span>
                            <span className="ml-4 text-slate-700">{option}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-10 pt-6 border-t">
                    <div><button onClick={handleMarkForReview} className={`px-5 py-2 rounded-lg border ${markedForReview[currentQuestion] ? 'bg-amber-400 text-white border-amber-400' : 'border-amber-400 text-amber-600 hover:bg-amber-50'}`}>{markedForReview[currentQuestion] ? 'Unmark Review' : 'Mark for Review'}</button></div>
                    <div>
                        <button onClick={() => changeQuestion(currentQuestion - 1)} disabled={currentQuestion === 0} className="px-5 py-2 mr-2 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-50">Previous</button>
                        {currentQuestion < bank.length - 1 ? (
                            <button onClick={() => changeQuestion(currentQuestion + 1)} className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Next</button>
                        ) : (
                            <button onClick={()=>handleSubmit(false)} className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700">Submit Test</button>
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold mb-4">Question Palette</h3>
                <div className="grid grid-cols-5 gap-3">
                    {bank.map((_, index) => {
                        let statusClass = 'bg-slate-200 text-slate-700';
                        if (markedForReview[index]) statusClass = 'bg-yellow-400 text-black';
                        else if(answers[index] !== null) statusClass = 'bg-green-600 text-white';
                        
                        if (index === currentQuestion) statusClass += ' ring-2 ring-blue-500';
                        return ( <button key={index} onClick={() => changeQuestion(index)} className={`h-10 w-10 flex items-center justify-center rounded-md font-semibold transition-transform transform hover:scale-110 ${statusClass}`}>{index + 1}</button> );
                    })}
                </div>
                <div className="mt-6 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center"><span className="h-4 w-4 rounded-full bg-green-600 mr-2"></span> Answered</div>
                    <div className="flex items-center"><span className="h-4 w-4 rounded-full bg-yellow-400 mr-2"></span> Marked</div>
                    <div className="flex items-center"><span className="h-4 w-4 rounded-full bg-slate-200 mr-2"></span> Not Answered</div>
                </div>
                <button onClick={()=>handleSubmit(true)} className="w-full mt-8 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600">End Test</button>
            </div>
        </div>
    );
};

export default TestAreaPage;
