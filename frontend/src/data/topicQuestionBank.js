import { getPaperSet1, getPaperSet2 } from './aptitudeTestBank';
import { getTechnicalPaperSet1 } from './TechnicalTestBank';
import { getUserAssignedPaper, getPaperQuestions } from '../services/paperAssignment';
import { getPracticeTest } from './practiceTestBank';

export const topicQuestionBank = {
  "Aptitude": (userId = null) => {
    // If no userId provided, default to paper1
    if (!userId) {
      const paperSet1 = getPaperSet1();
      return paperSet1.questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation
      }));
    }
    
    // Get assigned paper for this user
    const assignedPaper = getUserAssignedPaper(userId);
    return getPaperQuestions(assignedPaper);
  },
  "Technical": () => {
    const techPaper1 = getTechnicalPaperSet1();
    return (techPaper1.questions || []).map(q => ({
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation
    }));
  },
  "Problem on Trains Practice": () => {
    // Always use the uploaded MCQs, answers, and explanations from practiceTestBank.js
    const practiceTest = getPracticeTest("Problem on Trains");
    if (practiceTest && Array.isArray(practiceTest.questions) && practiceTest.questions.length === 30) {
      return practiceTest.questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation
      }));
    }
    // Fallback: return empty array if not found
    return [];
  }
};
