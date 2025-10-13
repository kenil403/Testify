import React from 'react';
import { ChevronLeftIcon } from '../components/icons/Icons';
import { 
  getElectricalPaperSet1,
  getElectricalPaperSet2,
  getElectricalPaperSet3,
  getElectricalPaperSet4,
  getElectricalPaperSet5
} from '../data/course_electrical';

const ElectricalSolutionPage = ({ navigate, currentUser, testState }) => {
  let paperNumber = 1;

  if (testState?.selectedPaperNumber) {
    paperNumber = testState.selectedPaperNumber;
  } else if (currentUser?.email) {
    const stored = localStorage.getItem(`user_${currentUser.email}_current_electrical_paper`);
    if (stored) {
      const n = parseInt(stored, 10);
      if (!Number.isNaN(n)) paperNumber = n;
    }
  }

  const paper = paperNumber === 2 ? getElectricalPaperSet2() :
                paperNumber === 3 ? getElectricalPaperSet3() :
                paperNumber === 4 ? getElectricalPaperSet4() :
                paperNumber === 5 ? getElectricalPaperSet5() :
                getElectricalPaperSet1();
  const bank = paper?.questions || [];

  return (
      <div className="container mx-auto">
          <div className="mb-6">
              <button
                  onClick={() => navigate('test-result')}
                  className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition-colors"
              >
                  <ChevronLeftIcon />
              </button>
          </div>

          <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold text-slate-800">
                  ⚡ Electrical Engineering Solutions
              </h1>
              <p className="text-lg text-slate-500 mt-4 max-w-3xl mx-auto">
                  Complete question paper with answers and detailed explanations. Review all {bank.length} questions with solutions.
              </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="space-y-8">
                  {bank.map((mcq, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-6 bg-slate-50/30">
                          <div className="flex items-center gap-3 mb-4">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">Q{index + 1}</span>
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
  );
};

export default ElectricalSolutionPage;
