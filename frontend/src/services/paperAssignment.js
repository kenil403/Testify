// Paper Assignment Service
// This service handles assigning different papers to different users

import { getPaperSet1, getPaperSet2, getPaperSet3, getPaperSet4, getPaperSet5 } from '../data/aptitudeTestBank';
import { getTechnicalPaperSet1, getTechnicalPaperSet2, getTechnicalPaperSet3, getTechnicalPaperSet4, getTechnicalPaperSet5, getTechnicalPaperSet6 } from '../data/TechnicalTestBank';
import { addTestResult, getTestHistory } from '../api/tests';

// Paper rotation logic that ensures different papers on subsequent tests
export const assignPaperToUser = (userId) => {
    const papers = ['paper1', 'paper2', 'paper3', 'paper4', 'paper5'];

    // Read cached server history from localStorage (App stores it on login)
    const testHistoryKey = `user_${userId}_test_history`;
    const testHistory = JSON.parse(localStorage.getItem(testHistoryKey) || '[]');

    // Count uses per paper
    const counts = papers.reduce((acc, p) => ({ ...acc, [p]: 0 }), {});
    testHistory.forEach(t => {
        if (t && t.paper && counts.hasOwnProperty(t.paper)) counts[t.paper]++;
    });

    // Determine the minimum usage count
    const minCount = Math.min(...Object.values(counts));
    // Candidate papers are those with the minimum count
    let candidates = papers.filter(p => counts[p] === minCount);

    // Avoid repeating the last used paper if possible
    const lastPaper = (testHistory[0] && testHistory[0].paper) || localStorage.getItem(`user_${userId}_current_paper`);
    if (candidates.length > 1 && lastPaper && candidates.includes(lastPaper)) {
        candidates = candidates.filter(p => p !== lastPaper);
    }

    // Select randomly among candidates to vary order
    const assignedPaper = candidates[Math.floor(Math.random() * candidates.length)];

    // Cache current assignment for session (fallback) - not authoritative
    localStorage.setItem(`user_${userId}_current_paper`, assignedPaper);
    return assignedPaper;
};

export const getUserAssignedPaper = (userId) => {
    // Always assign a new paper based on test history
    return assignPaperToUser(userId);
};
// Record test completion: try saving to server, fall back to localStorage
export const recordTestCompletion = async (userId, paper, score, category, testId = null) => {
    const testHistoryKey = `user_${userId}_test_history`;

    const testRecord = {
        paper,
        score,
        category,
        date: new Date().toISOString(),
        testId: testId || Date.now() // Use provided testId or generate new one
    };

    // Try to save to server first - but do not send practice tests
    try {
        // Do not store practice tests anywhere
        if (category && /practice/i.test(category)) {
            return null;
        }
        const payload = { category, score };
        const res = await addTestResult(payload);
        if (res && Array.isArray(res.testHistory)) {
            // server returned full history
            localStorage.setItem(testHistoryKey, JSON.stringify(res.testHistory));
        } else if (res && res.entry) {
            // merge returned entry into cache
            const existing = JSON.parse(localStorage.getItem(testHistoryKey) || '[]');
            existing.unshift(res.entry);
            localStorage.setItem(testHistoryKey, JSON.stringify(existing));
        }
        return res && res.entry ? res.entry : testRecord;
    } catch (err) {
        // If server save fails, return the test record (not persisted)
        console.warn('Failed to save test result to server', err);
        return testRecord;
    }
};

// Get user's test history: try server then local cache
export const getUserTestHistory = async (userId) => {
    const testHistoryKey = `user_${userId}_test_history`;
    try {
        const res = await getTestHistory();
        if (res && Array.isArray(res.testHistory)) {
            // return server history as authoritative (already excludes practice entries if backend skips them)
            return res.testHistory;
        }
    } catch (err) {
        console.warn('Failed to fetch test history from server', err);
        return [];
    }
    // default empty
    return [];
};

// Technical paper assignment logic
export const assignTechnicalPaperToUser = (userId) => {
    const technicalPapers = ['tech-paper1', 'tech-paper2', 'tech-paper3', 'tech-paper4', 'tech-paper5', 'tech-paper6'];

    // Read cached server history from localStorage (App stores it on login)
    const testHistoryKey = `user_${userId}_test_history`;
    const testHistory = JSON.parse(localStorage.getItem(testHistoryKey) || '[]');

    // Count uses per technical paper
    const counts = technicalPapers.reduce((acc, p) => ({ ...acc, [p]: 0 }), {});
    testHistory.forEach(t => {
        if (t && t.paper && counts.hasOwnProperty(t.paper)) counts[t.paper]++;
    });

    // Determine the minimum usage count
    const minCount = Math.min(...Object.values(counts));
    // Candidate papers are those with the minimum count
    let candidates = technicalPapers.filter(p => counts[p] === minCount);

    // Avoid repeating the last used paper if possible
    const lastPaper = (testHistory[0] && testHistory[0].paper) || localStorage.getItem(`user_${userId}_current_technical_paper`);
    if (candidates.length > 1 && lastPaper && candidates.includes(lastPaper)) {
        candidates = candidates.filter(p => p !== lastPaper);
    }

    // Select randomly among candidates to vary order
    const assignedPaper = candidates[Math.floor(Math.random() * candidates.length)];

    // Cache current assignment for session (fallback) - not authoritative
    localStorage.setItem(`user_${userId}_current_technical_paper`, assignedPaper);
    return assignedPaper;
};

export const getUserAssignedTechnicalPaper = (userId) => {
    // Always assign a new paper based on test history
    return assignTechnicalPaperToUser(userId);
};

export const getPaperData = (paperId) => {
    switch (paperId) {
        case 'paper1':
            return getPaperSet1();
        case 'paper2':
            return getPaperSet2();
        case 'paper3':
            return getPaperSet3();
        case 'paper4':
            return getPaperSet4();
        case 'paper5':
            return getPaperSet5();
        case 'tech-paper1':
            return getTechnicalPaperSet1();
        case 'tech-paper2':
            return getTechnicalPaperSet2();
        case 'tech-paper3':
            return getTechnicalPaperSet3();
        case 'tech-paper4':
            return getTechnicalPaperSet4();
        case 'tech-paper5':
            return getTechnicalPaperSet5();
        case 'tech-paper6':
            return getTechnicalPaperSet6();
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
