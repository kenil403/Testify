import React, { useState } from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';
import { topicQuestionBank } from '../data/topicQuestionBank';
import { getPracticeTest } from '../data/practiceTestBank';
import { assignPaper as assignDbPaper, getPaper as getDbPaper } from '../api/papers';

const TestInstructionsPage = ({ navigate, setTestState, testState, currentUser }) => {
    const [agreed, setAgreed] = useState(false);
    
    // Determine test configuration based on selected category
    const getTestConfig = () => {
        const category = testState?.selectedCategory || window.testCategory;
        
        if (category === 'Aptitude') {
            return {
                time: "60 minutes",
                questions: "60 questions",
                description: "This is a comprehensive aptitude test covering various topics including Quantitative ability,Arithmetic Aptitude, logical reasoning and problem-solving skills."
            };
        }
        if (category === 'Problem on Trains Practice') {
            return {
                time: "30 minutes to complete 30 questions",
                questions: "30 questions",
                description: "Practice Test: Problems on Trains focusing on relative speed, time, distance, bridge/platform crossing, and unit conversions. Solutions and explanations are shown after the test."
            };
        }
        if (category === 'Technical') {
            return {
                time: "60 minutes to complete 60 questions",
                questions: "60 questions",
                description: "This is a comprehensive technical round covering programming concepts, data structures & algorithms (DSA), and SQL topics across languages such as C, C++ and Java. It evaluates problem-solving, coding ability, and core technical knowledge."
            };
        }
        if (category === 'Mechanical Engineering') {
            return {
                time: "60 minutes to complete 60 questions",
                questions: "60 questions",
                description: "This is a comprehensive mechanical engineering test covering fundamental concepts in mechanics, thermodynamics, fluid mechanics, materials science, machine design, and manufacturing processes. It evaluates your understanding of core mechanical engineering principles."
            };
        }
        if (category === 'Computer Engineering') {
            return {
                time: "60 minutes to complete 60 questions",
                questions: "60 questions",
                description: "This is a comprehensive computer engineering test covering programming fundamentals, operating systems, databases, networking, algorithms, and digital logic."
            };
        }
        if (category === 'Electronics & Communication') {
            return {
                time: "60 minutes to complete 60 questions",
                questions: "60 questions",
                description: "This test covers networks, analog and digital electronics, signals and systems, control systems, communications, and microprocessors."
            };
        }
        if (category === 'Chemical Engineering') {
            return {
                time: "60 minutes to complete 60 questions",
                questions: "60 questions",
                description: "This test covers thermodynamics, fluid and heat transfer, mass transfer, reaction engineering, process control, and unit operations."
            };
        }
        if (category === 'Civil Engineering') {
            return {
                time: "60 minutes to complete 60 questions",
                questions: "60 questions",
                description: "This test covers structural analysis, concrete technology, soil mechanics, surveying, transportation, environmental engineering, and construction management."
            };
        }
        if (category === 'Electrical Engineering') {
            return {
                time: "60 minutes to complete 60 questions",
                questions: "60 questions",
                description: "This test covers circuit theory, electrical machines, power systems, control systems, electronics, EM theory, and measurements."
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
        const category = testState?.selectedCategory;
        
        // Always go to test-selection for Aptitude, Mechanical Engineering, Computer Engineering, Electronics & Communication, Chemical Engineering, Civil Engineering, and Electrical Engineering
        if (category === 'Aptitude' || category === 'Mechanical Engineering' || category === 'Computer Engineering' || category === 'Electronics & Communication' || category === 'Chemical Engineering' || category === 'Civil Engineering' || category === 'Electrical Engineering') {
            navigate('test-selection');
            return;
        }
        
        // For Problem on Trains Practice, go back to learn page
        if (category === 'Problem on Trains Practice') {
            navigate(testState?.returnPage || 'learn-Aptitude__Problem on Trains');
            return;
        }
        
        // For other tests, use returnPage or fallback to test-selection
        if (testState && testState.returnPage) {
            navigate(testState.returnPage);
        } else {
            navigate('test-selection');
        }
    };

    return (
        <div className="container mx-auto max-w-4xl">
            <div className="mb-8">
                <button onClick={handleBack} className="p-2 rounded-full hover:bg-slate-200 transition-colors">
                    <ChevronLeftIcon />
                </button>
            </div>
            <h1 className="text-3xl font-bold mb-6">Test Instructions</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="font-semibold text-xl mb-4">Please read the instructions carefully:</h2>
                <p>{config.description}</p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 mt-4">
                    <li>This is a timed test. You will have <strong>{config.time}</strong>.</li>
                    <li>Each question has 4 options, out of which only one is correct.</li>
                    <li>Each correct answer will award you 1 point. There is no negative marking.</li>
                    <li>You can mark a question for review to visit it later.</li>
                    <li>The test will be submitted automatically once the time is over.</li>
                    <li>You can navigate between questions using the question palette.</li>
                    {testState?.selectedCategory === 'Aptitude' && <li>Questions cover topics like trains, time-distance, work, percentage, profit-loss, and interests.</li>}
                    {testState?.selectedCategory === 'Problem on Trains Practice' && <li>This practice test is focused only on Problems on Trains and uses the uploaded practice paper.</li>}
                    {testState?.selectedCategory === 'Problem on Trains Practice' && <li>Questions are sourced from the uploaded practice paper in <code>practiceTestBank.js</code> and include explanations after the test.</li>}
                    {testState?.selectedCategory === 'Electronics & Communication' && <li>Questions cover networks, analog/digital electronics, signals & systems, control systems, communication systems, and microprocessors.</li>}
                    {testState?.selectedCategory === 'Computer Engineering' && <li>Questions cover topics like computer fundamentals, programming concepts, operating systems, databases, networking, artificial intelligence, digital logic, and system development.</li>}
                    {testState?.selectedCategory === 'Chemical Engineering' && <li>Questions cover topics like thermodynamics, fluid mechanics, heat transfer, mass transfer, chemical reaction engineering, process control, unit operations, and plant design.</li>}
                    {testState?.selectedCategory === 'Civil Engineering' && <li>Questions cover topics like structural analysis, concrete technology, soil mechanics, fluid mechanics, surveying, transportation engineering, environmental engineering, and construction management.</li>}
                    {testState?.selectedCategory === 'Electrical Engineering' && <li>Questions cover topics like circuit analysis, electrical machines, power systems, control systems, electronics, digital systems, electromagnetic theory, and electrical measurements.</li>}
                </ul>
                
                <div className="mt-8 pt-6 border-t">
                    <label className="flex items-center">
                        <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="h-5 w-5 text-green-600 rounded border-slate-300 focus:ring-green-500"/>
                        <span className="ml-3 text-slate-800">I have read and understood all the instructions.</span>
                    </label>
                </div>
                <div className="text-center mt-8">
                    <button 
                        onClick={async () => {
                            // Require authentication at the moment of proceeding to the test
                            if (!currentUser) {
                                alert('Please login or sign up to start the test.');
                                navigate('auth');
                                return;
                            }
                            // Build the exact bank to be used for this attempt
                            const category = testState?.selectedCategory || window.testCategory;
                            const source = category && topicQuestionBank[category];
                            // For Problems on Trains Practice, always use exactly 30 questions
                            let bank = [];
                            if (category === 'Problem on Trains Practice') {
                                const practice = getPracticeTest('Problem on Trains');
                                if (practice && Array.isArray(practice.questions)) {
                                    bank = practice.questions.slice(0, 30);
                                }
                            } else if (category === 'Aptitude') {
                                // Try DB-backed Aptitude papers first: assign and fetch the paper
                                let assignedId = null;
                                try {
                                    const lastLocal = localStorage.getItem(`user_${currentUser?.email}_current_paper`) || null;
                                    assignedId = await assignDbPaper('Aptitude', lastLocal);
                                } catch {}
                                if (assignedId) {
                                    const paper = await getDbPaper('Aptitude', assignedId);
                                    if (paper && Array.isArray(paper.questions) && paper.questions.length > 0) {
                                        bank = paper.questions.map(q => ({
                                            question: q.question,
                                            options: q.options,
                                            answer: q.answer,
                                            explanation: q.explanation
                                        }));
                                        // Persist current paper id locally to influence next assignment
                                        localStorage.setItem(`user_${currentUser?.email}_current_paper`, assignedId);
                                    }
                                }
                                // Enforce DB-only for Aptitude: if unavailable, stop here
                                if (!bank || bank.length === 0) {
                                    alert('Aptitude papers are unavailable right now. Please try again later.');
                                    return;
                                }
                            } else if (category === 'Technical') {
                                let assignedId = null;
                                try {
                                    const lastDbPaperId = localStorage.getItem(`user_${currentUser?.email}_current_paper_Technical`) || null;
                                    assignedId = await assignDbPaper('Technical', lastDbPaperId);
                                } catch {}
                                if (assignedId) {
                                    const paper = await getDbPaper('Technical', assignedId);
                                    if (paper && Array.isArray(paper.questions) && paper.questions.length > 0) {
                                        bank = paper.questions.map(q => ({ question: q.question, options: q.options, answer: q.answer, explanation: q.explanation }));
                                        // Persist current paper id and numeric selection for result pages
                                        localStorage.setItem(`user_${currentUser?.email}_current_paper_Technical`, assignedId);
                                        const numMatch = String(assignedId).match(/(\d+)$/);
                                        if (numMatch) localStorage.setItem(`user_${currentUser?.email}_current_technical_paper`, numMatch[1]);
                                    }
                                }
                                if (!bank || bank.length === 0) {
                                    alert('Technical papers are unavailable right now. Please try again later.');
                                    return;
                                }
                            } else if (category === 'Mechanical Engineering' || category === 'Computer Engineering' || category === 'Electronics & Communication' || category === 'Chemical Engineering' || category === 'Civil Engineering' || category === 'Electrical Engineering') {
                                let assignedId = null;
                                try {
                                    const lastDbPaperId = localStorage.getItem(`user_${currentUser?.email}_current_paper_${category}`) || null;
                                    assignedId = await assignDbPaper(category, lastDbPaperId);
                                } catch {}
                                if (assignedId) {
                                    const paper = await getDbPaper(category, assignedId);
                                    if (paper && Array.isArray(paper.questions) && paper.questions.length > 0) {
                                        bank = paper.questions.map(q => ({ question: q.question, options: q.options, answer: q.answer, explanation: q.explanation }));
                                        // Persist current paper id
                                        localStorage.setItem(`user_${currentUser?.email}_current_paper_${category}`, assignedId);
                                        // Also persist numeric selected paper for existing result page usage
                                        const numMatch = String(assignedId).match(/(\d+)$/);
                                        const num = numMatch ? numMatch[1] : '1';
                                        if (category === 'Mechanical Engineering') localStorage.setItem(`user_${currentUser?.email}_current_mechanical_paper`, num);
                                        if (category === 'Computer Engineering') localStorage.setItem(`user_${currentUser?.email}_current_computer_paper`, num);
                                        if (category === 'Electronics & Communication') localStorage.setItem(`user_${currentUser?.email}_current_electronics_paper`, num);
                                        if (category === 'Chemical Engineering') localStorage.setItem(`user_${currentUser?.email}_current_chemical_paper`, num);
                                        if (category === 'Civil Engineering') localStorage.setItem(`user_${currentUser?.email}_current_civil_paper`, num);
                                        if (category === 'Electrical Engineering') localStorage.setItem(`user_${currentUser?.email}_current_electrical_paper`, num);
                                    }
                                }
                                if (!bank || bank.length === 0) {
                                    alert(`${category} papers are unavailable right now. Please try again later.`);
                                    return;
                                }
                            } else {
                                bank = typeof source === 'function' ? source(currentUser?.email) : (source || []);
                            }
                            
                            // For Mechanical Engineering, get the selected paper number from the bank data
                            let selectedPaperNumber = 1;
                            if (category === 'Mechanical Engineering') {
                                // The paper number is stored in localStorage by topicQuestionBank.js
                                selectedPaperNumber = parseInt(localStorage.getItem(`user_${currentUser?.email}_current_mechanical_paper`) || '1');
                            } else if (category === 'Computer Engineering') {
                                // The paper number is stored in localStorage by topicQuestionBank.js
                                selectedPaperNumber = parseInt(localStorage.getItem(`user_${currentUser?.email}_current_computer_paper`) || '1');
                            } else if (category === 'Chemical Engineering') {
                                selectedPaperNumber = parseInt(localStorage.getItem(`user_${currentUser?.email}_current_chemical_paper`) || '1');
                            } else if (category === 'Civil Engineering') {
                                selectedPaperNumber = parseInt(localStorage.getItem(`user_${currentUser?.email}_current_civil_paper`) || '1');
                            } else if (category === 'Electrical Engineering') {
                                selectedPaperNumber = parseInt(localStorage.getItem(`user_${currentUser?.email}_current_electrical_paper`) || '1');
                            } else if (category === 'Technical') {
                                selectedPaperNumber = parseInt(localStorage.getItem(`user_${currentUser?.email}_current_technical_paper`) || '1');
                            }
                            const questionCount = category === 'Problem on Trains Practice' ? 30 : 
                                                category === 'Aptitude' ? 60 : 
                                                category === 'Technical' ? 60 :
                                                category === 'Mechanical Engineering' ? 60 :
                                                category === 'Computer Engineering' ? 60 :
                                                category === 'Chemical Engineering' ? 60 :
                                                category === 'Civil Engineering' ? 60 :
                                                category === 'Electrical Engineering' ? 60 :
                                                bank.length || 10;

                            // Clear window.testCategory after using it
                            if (window.testCategory) {
                                window.testCategory = null;
                            }

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
                                testQuestions: bank,
                                testId: Date.now(), // Add unique test ID
                                selectedPaperNumber: selectedPaperNumber // Store the selected paper number
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
