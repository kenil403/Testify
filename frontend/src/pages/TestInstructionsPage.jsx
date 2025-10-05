import React, { useState } from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';
import { topicQuestionBank } from '../data/topicQuestionBank';

const TestInstructionsPage = ({ navigate, setTestState, testState }) => {
    const [agreed, setAgreed] = useState(false);
    
    // Determine test configuration based on selected category
    const getTestConfig = () => {
        if (testState?.selectedCategory === 'Aptitude') {
            return {
                time: "60 minutes",
                questions: "60 questions",
                description: "This is a comprehensive aptitude test covering various topics including quantitative ability, logical reasoning, and problem-solving skills."
            };
        }
        return {
            time: "10 minutes", 
            questions: "10 questions",
            description: "This is a timed test evaluating your knowledge in the selected topic."
        };
    };
    
    const config = getTestConfig();
    
    const handleBack = () => {
        if (testState && testState.returnPage) {
            navigate(testState.returnPage);
        } else {
            navigate('test-selection');
        }
    };

    return (
        <div className="container mx-auto max-w-4xl">
             <button onClick={handleBack} className="p-2 rounded-full hover:bg-slate-200 transition-colors mb-8">
                <ChevronLeftIcon />
            </button>
            <h1 className="text-3xl font-bold mb-6">Test Instructions</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="font-semibold text-xl mb-4">Please read the instructions carefully:</h2>
                <p>{config.description}</p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 mt-4">
                    <li>This is a timed test. You will have <strong>{config.time}</strong> to complete {config.questions}.</li>
                    <li>Each question has 4 options, out of which only one is correct.</li>
                    <li>Each correct answer will award you 1 point. There is no negative marking.</li>
                    <li>You can mark a question for review to visit it later.</li>
                    <li>The test will be submitted automatically once the time is over.</li>
                    <li>You can navigate between questions using the question palette.</li>
                    {testState?.selectedCategory === 'Aptitude' && <li>Questions cover topics like trains, time-distance, work, percentage, profit-loss, and interests.</li>}
                </ul>
                <div className="mt-8 pt-6 border-t">
                    <label className="flex items-center">
                        <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="h-5 w-5 text-green-600 rounded border-slate-300 focus:ring-green-500"/>
                        <span className="ml-3 text-slate-800">I have read and understood all the instructions.</span>
                    </label>
                </div>
                <div className="text-center mt-8">
                     <button 
                        onClick={() => {
                            // Build the exact bank to be used for this attempt
                            const category = testState?.selectedCategory;
                            const source = category && topicQuestionBank[category];
                            const bank = typeof source === 'function' ? source() : (source || []);
                            const questionCount = bank.length || (category === 'Aptitude' ? 60 : 10);

                            // Fully reset state and seed attempt-specific questions
                            setTestState({
                                started: true,
                                finished: false,
                                currentQuestion: 0,
                                answers: Array(questionCount).fill(null),
                                markedForReview: Array(questionCount).fill(false),
                                score: 0,
                                selectedCategory: category,
                                returnPage: testState?.returnPage,
                                testQuestions: bank
                            });
                            navigate('test-area');
                        }}
                        disabled={!agreed} 
                        className={`px-10 py-3 font-bold text-white rounded-lg transition-colors ${agreed ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-400 cursor-not-allowed'}`}
                    >
                        Proceed to Test
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestInstructionsPage;
