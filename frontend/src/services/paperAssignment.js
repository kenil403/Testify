// Paper Assignment Service
// This service handles assigning different papers to different users

import { getPaperSet1, getPaperSet2, getPaperSet3 } from '../data/aptitudeTestBank';

// Paper rotation logic that ensures different papers on subsequent tests
export const assignPaperToUser = (userId) => {
    const papers = ['paper1', 'paper2', 'paper3'];
    
    // Get user's test history from localStorage
    const testHistoryKey = `user_${userId}_test_history`;
    const testHistory = JSON.parse(localStorage.getItem(testHistoryKey) || '[]');
    
    // Count papers used in previous tests
    const paper1Count = testHistory.filter(test => test.paper === 'paper1').length;
    const paper2Count = testHistory.filter(test => test.paper === 'paper2').length;
    const paper3Count = testHistory.filter(test => test.paper === 'paper3').length;
    
    // Assign the paper that has been used less frequently
    let assignedPaper;
    if (paper1Count <= paper2Count && paper1Count <= paper3Count) {
        assignedPaper = 'paper1';
    } else if (paper2Count <= paper3Count) {
        assignedPaper = 'paper2';
    } else {
        assignedPaper = 'paper3';
    }
    
    // Store assignment in localStorage for this session
    localStorage.setItem(`user_${userId}_current_paper`, assignedPaper);
    
    return assignedPaper;
};

export const getUserAssignedPaper = (userId) => {
    // Always assign a new paper based on test history
    return assignPaperToUser(userId);
};

export const recordTestCompletion = (userId, paper, score, category, testId = null) => {
    // Record this test completion
    const testHistoryKey = `user_${userId}_test_history`;
    const testHistory = JSON.parse(localStorage.getItem(testHistoryKey) || '[]');
    
    const testRecord = {
        paper,
        score,
        category,
        date: new Date().toISOString(),
        testId: testId || Date.now() // Use provided testId or generate new one
    };
    
    testHistory.push(testRecord);
    localStorage.setItem(testHistoryKey, JSON.stringify(testHistory));
    
    return testRecord;
};

export const getUserTestHistory = (userId) => {
    const testHistoryKey = `user_${userId}_test_history`;
    return JSON.parse(localStorage.getItem(testHistoryKey) || '[]');
};

export const getPaperData = (paperId) => {
    switch (paperId) {
        case 'paper1':
            return getPaperSet1();
        case 'paper2':
            return getPaperSet2();
        case 'paper3':
            return getPaperSet3();
        default:
            return getPaperSet1(); // Default fallback
    }
};

export const getPaperQuestions = (paperId) => {
    const paper = getPaperData(paperId);
    return paper.questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation
    }));
};
