import { getPaperSet1, getPaperSet2, getPaperSet3, getPaperSet4, getPaperSet5 } from './aptitudeTestBank';
import { getTechnicalPaperSet1, getTechnicalPaperSet2, getTechnicalPaperSet3, getTechnicalPaperSet4, getTechnicalPaperSet5, getTechnicalPaperSet6 } from './TechnicalTestBank';
import { getMechanicalPaperSet1, getMechanicalPaperSet2, getMechanicalPaperSet3, getMechanicalPaperSet4, getMechanicalPaperSet5 } from './course_mechanical';
import { getComputerPaperSet1, getComputerPaperSet2, getComputerPaperSet3, getComputerPaperSet4, getComputerPaperSet5 } from './course_computer';
import { getElectronicsPaperSet1, getElectronicsPaperSet2, getElectronicsPaperSet3, getElectronicsPaperSet4, getElectronicsPaperSet5 } from './course_electronics';
import { getChemicalPaperSet1, getChemicalPaperSet2, getChemicalPaperSet3, getChemicalPaperSet4, getChemicalPaperSet5 } from './course_chemical';
import { getCivilPaperSet1, getCivilPaperSet2, getCivilPaperSet3, getCivilPaperSet4, getCivilPaperSet5 } from './course_civil';
import { getElectricalPaperSet1, getElectricalPaperSet2, getElectricalPaperSet3, getElectricalPaperSet4, getElectricalPaperSet5 } from './course_electrical';
import { getUserAssignedPaper, getPaperQuestions, getUserAssignedTechnicalPaper } from '../services/paperAssignment';
import { getPracticeTest } from './practiceTestBank';

export const topicQuestionBank = {
  "Aptitude": (userId = null) => {
    // If no userId provided, default to paper1
    if (!userId) {
      // Default to paper 1 if no user, include all answers and explanations
      const paper = getPaperSet1();
      return paper.questions.map(q => ({
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
  "Electronics & Communication": (userId = null) => {
    // Track which electronics papers the user has taken
    const userKey = `user_${userId}_electronics_papers_taken`;
    const takenPapers = JSON.parse(localStorage.getItem(userKey) || '[]');

    // Available paper numbers (filter out papers that have no questions yet)
    const electronicsGettersByNumber = {
      1: getElectronicsPaperSet1,
      2: getElectronicsPaperSet2,
      3: getElectronicsPaperSet3,
      4: getElectronicsPaperSet4,
      5: getElectronicsPaperSet5
    };
    const availablePapers = [1, 2, 3, 4, 5].filter(num => {
      try {
        const paper = electronicsGettersByNumber[num]();
        return paper && Array.isArray(paper.questions) && paper.questions.length > 0;
      } catch {
        return false;
      }
    });
    // If none available (shouldn't happen), fallback to set 1
    if (availablePapers.length === 0) {
      availablePapers.push(1);
    }

    // Choose from remaining papers
    const remainingPapers = availablePapers.filter(paperNum => !takenPapers.includes(paperNum));
    let selectedPaper;
    if (remainingPapers.length === 0) {
      // Reset and choose randomly if all taken
      localStorage.setItem(userKey, '[]');
      selectedPaper = availablePapers[Math.floor(Math.random() * availablePapers.length)];
    } else {
      selectedPaper = remainingPapers[Math.floor(Math.random() * remainingPapers.length)];
    }

    // Mark selected as taken and store for solutions/result page
    const updatedTaken = [...takenPapers, selectedPaper];
    localStorage.setItem(userKey, JSON.stringify(updatedTaken));
    if (userId) localStorage.setItem(`user_${userId}_current_electronics_paper`, selectedPaper.toString());

    // Get the selected paper data
  const selectedPaperData = selectedPaper === 2 ? getElectronicsPaperSet2() :
               selectedPaper === 3 ? getElectronicsPaperSet3() :
               selectedPaper === 4 ? getElectronicsPaperSet4() :
               selectedPaper === 5 ? getElectronicsPaperSet5() :
               getElectronicsPaperSet1();

    return (selectedPaperData.questions || []).map(q => ({
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation
    }));
  },
  "Technical": (userId = null) => {
    // If no userId provided, rotate across technical papers using anon storage so it doesn't stick to one set
    if (!userId) {
      const takenKey = 'anon_technical_papers_taken';
      const currentKey = 'anon_current_technical_paper';
      const taken = JSON.parse(localStorage.getItem(takenKey) || '[]');
      const available = [1,2,3,4,5,6];
      const remaining = available.filter(n => !taken.includes(n));
      let pick;
      if (remaining.length === 0) {
        localStorage.setItem(takenKey, '[]');
        pick = available[Math.floor(Math.random() * available.length)];
      } else {
        pick = remaining[Math.floor(Math.random() * remaining.length)];
      }
      localStorage.setItem(takenKey, JSON.stringify([...taken, pick]));
      localStorage.setItem(currentKey, pick.toString());

      const techPaper = pick === 2 ? getTechnicalPaperSet2() :
                        pick === 3 ? getTechnicalPaperSet3() :
                        pick === 4 ? getTechnicalPaperSet4() :
                        pick === 5 ? getTechnicalPaperSet5() :
                        pick === 6 ? getTechnicalPaperSet6() :
                        getTechnicalPaperSet1();
      return (techPaper.questions || []).map(q => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation
      }));
    }
    
    // Get assigned technical paper for this user
    const assignedPaper = getUserAssignedTechnicalPaper(userId);
    let techPaper;
    let paperNumber;

    switch (assignedPaper) {
      case 'tech-paper2':
        techPaper = getTechnicalPaperSet2(); paperNumber = 2; break;
      case 'tech-paper3':
        techPaper = getTechnicalPaperSet3(); paperNumber = 3; break;
      case 'tech-paper4':
        techPaper = getTechnicalPaperSet4(); paperNumber = 4; break;
      case 'tech-paper5':
        techPaper = getTechnicalPaperSet5(); paperNumber = 5; break;
      case 'tech-paper6':
        techPaper = getTechnicalPaperSet6(); paperNumber = 6; break;
      default:
        techPaper = getTechnicalPaperSet1(); paperNumber = 1; break;
    }
    
    // Store the selected paper number for result page
    localStorage.setItem(`user_${userId}_current_technical_paper`, paperNumber.toString());
    
    return (techPaper.questions || []).map(q => ({
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation
    }));
  },
  "Mechanical Engineering": (userId = null) => {
    // Get user's test history to determine which papers they've already taken
    const userKey = `user_${userId}_mechanical_papers_taken`;
    const takenPapers = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    // Available papers
    const availablePapers = [1, 2, 3, 4, 5]; // Add more as you create more papers
    
    // Find papers not yet taken
    const remainingPapers = availablePapers.filter(paperNum => !takenPapers.includes(paperNum));
    
    let selectedPaper;
    if (remainingPapers.length === 0) {
      // All papers taken, reset and start over with random selection
      localStorage.setItem(userKey, '[]');
      selectedPaper = availablePapers[Math.floor(Math.random() * availablePapers.length)];
    } else {
      // Randomly select from remaining papers
      selectedPaper = remainingPapers[Math.floor(Math.random() * remainingPapers.length)];
    }
    
    // Mark this paper as taken
    const updatedTakenPapers = [...takenPapers, selectedPaper];
    localStorage.setItem(userKey, JSON.stringify(updatedTakenPapers));
    
    // Store the selected paper for solution page access
    localStorage.setItem(`user_${userId}_current_mechanical_paper`, selectedPaper.toString());
    
    // Return the selected paper's questions
    const selectedPaperData = selectedPaper === 1 ? getMechanicalPaperSet1() : 
                             selectedPaper === 2 ? getMechanicalPaperSet2() : 
                             selectedPaper === 3 ? getMechanicalPaperSet3() :
                             selectedPaper === 4 ? getMechanicalPaperSet4() :
                             getMechanicalPaperSet5();
    return (selectedPaperData.questions || []).map(q => ({
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation
    }));
  },
  "Computer Engineering": (userId = null) => {
    // Get user's test history to determine which papers they've already taken
    const userKey = `user_${userId}_computer_papers_taken`;
    const takenPapers = JSON.parse(localStorage.getItem(userKey) || '[]');
    
    // Available papers
    const availablePapers = [1, 2, 3, 4, 5]; // All 5 Paper Sets available
    
    // Find papers not yet taken
    const remainingPapers = availablePapers.filter(paperNum => !takenPapers.includes(paperNum));
    
    let selectedPaper;
    if (remainingPapers.length === 0) {
      // All papers taken, reset and start over with random selection
      localStorage.setItem(userKey, '[]');
      selectedPaper = availablePapers[Math.floor(Math.random() * availablePapers.length)];
    } else {
      // Randomly select from remaining papers
      selectedPaper = remainingPapers[Math.floor(Math.random() * remainingPapers.length)];
    }
    
    // Mark this paper as taken
    const updatedTakenPapers = [...takenPapers, selectedPaper];
    localStorage.setItem(userKey, JSON.stringify(updatedTakenPapers));
    
    // Store the selected paper for solution page access
    localStorage.setItem(`user_${userId}_current_computer_paper`, selectedPaper.toString());
    
    // Return the selected paper's questions
    const selectedPaperData = selectedPaper === 2 ? getComputerPaperSet2() : 
                              selectedPaper === 3 ? getComputerPaperSet3() : 
                              selectedPaper === 4 ? getComputerPaperSet4() : 
                              selectedPaper === 5 ? getComputerPaperSet5() : 
                              getComputerPaperSet1();
    return (selectedPaperData.questions || []).map(q => ({
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
  },
  "Chemical Engineering": (userId = null) => {
    // Track which chemical papers the user has taken
    const userKey = `user_${userId}_chemical_papers_taken`;
    const takenPapers = JSON.parse(localStorage.getItem(userKey) || '[]');

    // Available paper numbers (filter out papers that have no questions yet)
    const chemicalGettersByNumber = {
      1: getChemicalPaperSet1,
      2: getChemicalPaperSet2,
      3: getChemicalPaperSet3,
      4: getChemicalPaperSet4,
      5: getChemicalPaperSet5
    };
    const availablePapers = [1, 2, 3, 4, 5].filter(num => {
      try {
        const paper = chemicalGettersByNumber[num]();
        return paper && Array.isArray(paper.questions) && paper.questions.length > 0;
      } catch {
        return false;
      }
    });
    // If none available (shouldn't happen), fallback to set 1
    if (availablePapers.length === 0) {
      availablePapers.push(1);
    }

    // Find papers not yet taken
    const remainingPapers = availablePapers.filter(paperNum => !takenPapers.includes(paperNum));
    
    // Select a paper: if all papers taken, reset and pick randomly; otherwise pick from remaining
    let selectedPaper;
    if (remainingPapers.length === 0) {
      // All papers taken, reset and pick randomly
      localStorage.setItem(userKey, '[]');
      selectedPaper = availablePapers[Math.floor(Math.random() * availablePapers.length)];
    } else {
      // Pick randomly from remaining papers
      selectedPaper = remainingPapers[Math.floor(Math.random() * remainingPapers.length)];
    }

    // Update taken papers list
    const updatedTakenPapers = [...takenPapers, selectedPaper];
    localStorage.setItem(userKey, JSON.stringify(updatedTakenPapers));
    localStorage.setItem(`user_${userId}_current_chemical_paper`, selectedPaper.toString());

    // Get the selected paper data
    const selectedPaperData = chemicalGettersByNumber[selectedPaper]();
    if (selectedPaperData && selectedPaperData.questions) {
      return selectedPaperData.questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation
      }));
    }
    // Fallback: return empty array if not found
    return [];
  },
  "Civil Engineering": (userId = null) => {
    // Track which civil papers the user has taken
    const userKey = `user_${userId}_civil_papers_taken`;
    const takenPapers = JSON.parse(localStorage.getItem(userKey) || '[]');

    // Available paper numbers (filter out papers that have no questions yet)
    const civilGettersByNumber = {
      1: getCivilPaperSet1,
      2: getCivilPaperSet2,
      3: getCivilPaperSet3,
      4: getCivilPaperSet4,
      5: getCivilPaperSet5
    };
    const availablePapers = [1, 2, 3, 4, 5].filter(num => {
      try {
        const paper = civilGettersByNumber[num]();
        return paper && Array.isArray(paper.questions) && paper.questions.length > 0;
      } catch {
        return false;
      }
    });
    // If none available (shouldn't happen), fallback to set 1
    if (availablePapers.length === 0) {
      availablePapers.push(1);
    }

    // Find papers not yet taken
    const remainingPapers = availablePapers.filter(paperNum => !takenPapers.includes(paperNum));
    
    // Select a paper: if all papers taken, reset and pick randomly; otherwise pick from remaining
    let selectedPaper;
    if (remainingPapers.length === 0) {
      // All papers taken, reset and pick randomly
      localStorage.setItem(userKey, '[]');
      selectedPaper = availablePapers[Math.floor(Math.random() * availablePapers.length)];
    } else {
      // Pick randomly from remaining papers
      selectedPaper = remainingPapers[Math.floor(Math.random() * remainingPapers.length)];
    }

    // Update taken papers list
    const updatedTakenPapers = [...takenPapers, selectedPaper];
    localStorage.setItem(userKey, JSON.stringify(updatedTakenPapers));
    localStorage.setItem(`user_${userId}_current_civil_paper`, selectedPaper.toString());

    // Get the selected paper data
    const selectedPaperData = civilGettersByNumber[selectedPaper]();
    if (selectedPaperData && selectedPaperData.questions) {
      return selectedPaperData.questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation
      }));
    }
    // Fallback: return empty array if not found
    return [];
  },
  "Electrical Engineering": (userId = null) => {
    // Track which electrical papers the user has taken
    const userKey = `user_${userId}_electrical_papers_taken`;
    const takenPapers = JSON.parse(localStorage.getItem(userKey) || '[]');

    // Available paper numbers (filter out papers that have no questions yet)
    const electricalGettersByNumber = {
      1: getElectricalPaperSet1,
      2: getElectricalPaperSet2,
      3: getElectricalPaperSet3,
      4: getElectricalPaperSet4,
      5: getElectricalPaperSet5
    };
    const availablePapers = [1, 2, 3, 4, 5].filter(num => {
      try {
        const paper = electricalGettersByNumber[num]();
        return paper && Array.isArray(paper.questions) && paper.questions.length > 0;
      } catch {
        return false;
      }
    });
    // If none available (shouldn't happen), fallback to set 1
    if (availablePapers.length === 0) {
      availablePapers.push(1);
    }

    // Find papers not yet taken
    const remainingPapers = availablePapers.filter(paperNum => !takenPapers.includes(paperNum));
    
    // Select a paper: if all papers taken, reset and pick randomly; otherwise pick from remaining
    let selectedPaper;
    if (remainingPapers.length === 0) {
      // All papers taken, reset and pick randomly
      localStorage.setItem(userKey, '[]');
      selectedPaper = availablePapers[Math.floor(Math.random() * availablePapers.length)];
    } else {
      // Pick randomly from remaining papers
      selectedPaper = remainingPapers[Math.floor(Math.random() * remainingPapers.length)];
    }

    // Update taken papers list
    const updatedTakenPapers = [...takenPapers, selectedPaper];
    localStorage.setItem(userKey, JSON.stringify(updatedTakenPapers));
    localStorage.setItem(`user_${userId}_current_electrical_paper`, selectedPaper.toString());

    // Get the selected paper data
    const selectedPaperData = electricalGettersByNumber[selectedPaper]();
    if (selectedPaperData && selectedPaperData.questions) {
      return selectedPaperData.questions.map(q => ({
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
