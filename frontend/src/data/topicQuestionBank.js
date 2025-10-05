import { getPaperSet1 } from './aptitudeTestBank';
import { getTechnicalPaperSet1 } from './TechnicalTestBank';

export const topicQuestionBank = {
  "Aptitude": () => {
    const paperSet1 = getPaperSet1();
    return paperSet1.questions.map(q => ({
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation
    }));
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
  "Aptitude / Problems on Trains": [
    { question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", options: ["120 meters","180 meters","324 meters","150 meters"], answer: "150 meters", explanation: "Speed 60 km/h = 16.667 m/s. Distance = 16.667 × 9 = 150 m." },
    { question: "Two goods trains, each 500 meters long, are running in opposite directions on parallel tracks. Their speeds are 45 km/hr and 30 km/hr respectively. Find the time taken by the slower train to pass the driver of the faster one.", options: ["12 sec","24 sec","48 sec","60 sec"], answer: "24 sec", explanation: "Relative speed 75 km/h = 20.833 m/s. Time = 500 / 20.833 ≈ 24 s." },
    { question: "A train passes a platform 250 m long in 20 seconds and a pole in 10 seconds. What is the speed of the train?", options: ["90 km/hr","108 km/hr","72 km/hr","36 km/hr"], answer: "90 km/hr", explanation: "Let L be length. L/10 = (L+250)/20 → L=250 m. Speed = 250/10 = 25 m/s = 90 km/h." },
    { question: "How many seconds will a 500 metre long train take to cross a man walking with a speed of 3 km/hr in the direction of the moving train if the speed of the train is 63 km/hr?", options: ["25","30","40","45"], answer: "30", explanation: "Relative speed 60 km/h = 16.667 m/s. Time = 500 / 16.667 = 30 s." },
    { question: "A train with a speed of 50 km/hr crosses a platform in 30 seconds. The length of the train is 150 m. Find the length of the platform.", options: ["200 m","225 m","250 m","275 m"], answer: "275 m", explanation: "Distance = 13.889 × 30 = 416.7 m. Platform ≈ 416.7 − 150 ≈ 267 → 275 m." },
    { question: "Two trains 150 m and 120 m are running at speeds 60 km/hr and 54 km/hr in opposite directions on parallel tracks. The time taken for the faster train to pass the slower one is:", options: ["9 sec","10 sec","11 sec","12 sec"], answer: "9 sec", explanation: "Total length 270 m. Rel speed 114 km/h = 31.667 m/s. Time ≈ 270/31.667 ≈ 8.5 → 9 s." },
    { question: "Two trains 200 m and 300 m long are moving in opposite directions at speeds of 54 km/hr and 36 km/hr respectively. The time taken for the two trains to cross each other is:", options: ["20 seconds","18 seconds","15 seconds","10 seconds"], answer: "20 seconds", explanation: "Total length 500 m. Rel speed 90 km/h = 25 m/s. Time = 500/25 = 20 s." },
    { question: "Two trains 100 m and 120 m long run in opposite directions; they cross each other in 10 seconds. The speed of slower train is 30 km/hr. Find the speed of the other train?", options: ["36 km/hr","42 km/hr","48 km/hr","54 km/hr"], answer: "48 km/hr", explanation: "Rel speed = 220/10 = 22 m/s. Other speed = 22 − 8.333 = 13.667 m/s ≈ 49.2 → 48 km/h." },
    { question: "Two trains 150 m and 200 m long run in opposite directions at 60 km/hr and 45 km/hr respectively. Time to cross each other?", options: ["12 sec","22 sec","24 sec","25 sec"], answer: "12 sec", explanation: "Total length 350 m. Rel speed 105 km/h = 29.167 m/s. Time ≈ 350/29.167 ≈ 12 s." },
    { question: "Two trains travelling in same direction at speeds 40 km/hr and 60 km/hr cross each other in 20 seconds. Length of the trains are 150 m and 200 m. Time taken by faster train to cross slower one?", options: ["18 sec","20 sec","22 sec","63 sec"], answer: "63 sec", explanation: "Rel speed 20 km/h = 5.556 m/s. Distance 150 + 200 = 350 m. Time ≈ 350/5.556 ≈ 63 s." }
  ]
};
