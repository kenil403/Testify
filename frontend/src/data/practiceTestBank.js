// Practice Test Bank
// This file contains practice tests for specific topics

export const practiceTests = {
    "Problem on Trains": {
        testId: "trains_practice",
        name: "Problem on Trains Practice Test",
        duration: 30, // minutes
        totalQuestions: 30,
        questions: [
            {
                id: 1,
                question: "A train is moving at a speed of 180 km/h. Its speed in meters per second (m/s) is:",
                options: ["40 m/s", "45 m/s", "50 m/s", "60 m/s"],
                answer: "50 m/s",
                explanation: "To convert speed from kilometers per hour (km/h) to meters per second (m/s), we use the conversion factor 5/18. Speed in m/s = Speed in km/h x 5/18. Speed = 180 x 5/18 = 10 x 5 = 50 m/s."
            },
            {
                id: 2,
                question: "A train travels at 25 m/s. What is its speed in km/h?",
                options: ["72 km/h", "80 km/h", "90 km/h", "100 km/h"],
                answer: "90 km/h",
                explanation: "To convert speed from meters per second (m/s) to kilometers per hour (km/h), we use the conversion factor 18/5. Speed in km/h = Speed in m/s x 18/5. Speed = 25 x 18/5 = 5 x 18 = 90 km/h."
            },
            {
                id: 3,
                question: "A train 150 m long is running at a speed of 36 km/h. How much time will it take to pass a telegraph pole?",
                options: ["10 sec", "12 sec", "15 sec", "18 sec"],
                answer: "15 sec",
                explanation: "When a train passes a stationary point object like a telegraph pole, the distance it covers is equal to its own length. First, convert the speed to m/s: Speed = 36 km/h = 36 x 5/18 = 10 m/s. Distance = Length of the train = 150 m. Time = Distance / Speed = 150 / 10 = 15 seconds."
            },
            {
                id: 4,
                question: "A train of length 200 m passes a man standing on a platform in 10 seconds. What is the speed of the train?",
                options: ["20 m/s", "22 m/s", "24 m/s", "25 m/s"],
                answer: "20 m/s",
                explanation: "The distance the train covers to pass the man is its own length. Distance = 200 m. Time = 10 s. Speed = Distance / Time = 200 / 10 = 20 m/s."
            },
            {
                id: 5,
                question: "How long does a train 110 meters long running at a speed of 72 km/h take to cross a bridge 132 meters in length?",
                options: ["9.8 sec", "12.1 sec", "12.42 sec", "14.3 sec"],
                answer: "12.1 sec",
                explanation: "To cross a bridge, the train must cover its own length plus the length of the bridge. Total distance = Length of train + Length of bridge = 110 + 132 = 242 m. Convert speed to m/s: Speed = 72 km/h = 72 x 5/18 = 20 m/s. Time = Total Distance / Speed = 242 / 20 = 12.1 seconds."
            },
            {
                id: 6,
                question: "A train running at a speed of 90 km/h crosses a platform 200 meters long in 22 seconds. What is the length of the train?",
                options: ["250 m", "300 m", "350 m", "400 m"],
                answer: "350 m",
                explanation: "First, convert the speed to m/s: Speed = 90 km/h = 90 x 5/18 = 25 m/s. The total distance covered by the train is its length plus the platform's length. Total Distance = Speed x Time = 25 x 22 = 550 m. Length of train = Total Distance - Length of platform = 550 - 200 = 350 m."
            },
            {
                id: 7,
                question: "A 300-meter long train crosses a platform in 39 seconds while it crosses a signal pole in 18 seconds. What is the length of the platform?",
                options: ["325 m", "350 m", "375 m", "400 m"],
                answer: "350 m",
                explanation: "First, calculate the speed of the train using the information about crossing the pole. Speed = Length of train / Time to cross pole = 300 / 18 m/s. Now, calculate the total distance covered when crossing the platform. Total Distance (Train + Platform) = Speed x Time to cross platform = (300 / 18) x 39 = 650 m. Length of platform = Total Distance - Length of train = 650 - 300 = 350 m."
            },
            {
                id: 8,
                question: "The length of a bridge, which a train 130 meters long and travelling at 45 km/h can cross in 30 seconds, is:",
                options: ["200 m", "225 m", "245 m", "250 m"],
                answer: "245 m",
                explanation: "Convert the speed to m/s: Speed = 45 km/h = 45 x 5/18 = 12.5 m/s. Calculate the total distance covered. Total Distance = Speed x Time = 12.5 x 30 = 375 m. Length of bridge = Total Distance - Length of train = 375 - 130 = 245 m."
            },
            {
                id: 9,
                question: "A train takes 10 seconds to pass a pole and 25 seconds to pass a platform of length 300 m. What is the length of the train?",
                options: ["150 m", "200 m", "250 m", "300 m"],
                answer: "200 m",
                explanation: "Let the length of the train be L meters and its speed be S m/s. From the first condition (crossing a pole): S = L / 10. From the second condition (crossing a platform): S = (L + 300) / 25. Since the speed is the same, we can equate the two expressions: L / 10 = (L + 300) / 25. 25L = 10(L + 300). 25L = 10L + 3000. 15L = 3000. L = 3000 / 15 = 200 m."
            },
            {
                id: 10,
                question: "A train moves past a telegraph post and a bridge 264 m long in 8 seconds and 20 seconds respectively. What is the speed of the train?",
                options: ["69.5 km/h", "70 km/h", "79 km/h", "79.2 km/h"],
                answer: "79.2 km/h",
                explanation: "Let the length of the train be L meters and its speed be S m/s. S = L / 8 => L = 8S. S = (L + 264) / 20. Substitute the first equation into the second: S = (8S + 264) / 20. 20S = 8S + 264. 12S = 264. S = 264 / 12 = 22 m/s. Convert speed to km/h: 22 x 18/5 = 396 / 5 = 79.2 km/h."
            },
            {
                id: 11,
                question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/h, what is the length of the platform?",
                options: ["220 m", "240 m", "260 m", "280 m"],
                answer: "240 m",
                explanation: "Convert speed to m/s: Speed = 54 km/h = 54 x 5/18 = 15 m/s. Length of the train = Speed x Time to cross the man = 15 x 20 = 300 m. Total distance (Train + Platform) = Speed x Time to cross platform = 15 x 36 = 540 m. Length of the platform = Total distance - Length of the train = 540 - 300 = 240 m."
            },
            {
                id: 12,
                question: "A train speeds past a pole in 15 seconds and a platform 100 m long in 25 seconds. What is its length?",
                options: ["120 m", "150 m", "180 m", "200 m"],
                answer: "150 m",
                explanation: "Let the length be L and speed be S. S = L / 15. S = (L + 100) / 25. Equating the speeds: L / 15 = (L + 100) / 25. 25L = 15(L + 100). 25L = 15L + 1500. 10L = 1500 => L = 150 m."
            },
            {
                id: 13,
                question: "A train of length 150 metres takes 40.5 seconds to cross a tunnel of length 300 metres. What is the speed of the train in km/h?",
                options: ["13.33 km/h", "26.67 km/h", "40 km/h", "66.67 km/h"],
                answer: "40 km/h",
                explanation: "Total Distance = Length of train + Length of tunnel = 150 + 300 = 450 m. Time = 40.5 s. Speed = Distance / Time = 450 / 40.5 = 4500 / 405 = 100 / 9 m/s. Convert speed to km/h: Speed = (100 / 9) x (18 / 5) = 20 x 2 = 40 km/h."
            },
            {
                id: 14,
                question: "A train takes 18 seconds to pass completely through a station 162 m long and 15 seconds through another station 120 m long. The length of the train is:",
                options: ["70 m", "80 m", "90 m", "100 m"],
                answer: "90 m",
                explanation: "Let the length of the train be L meters and its speed be S m/s. S = (L + 162) / 18. S = (L + 120) / 15. Equating the speeds: (L + 162) / 18 = (L + 120) / 15. 15(L + 162) = 18(L + 120). 15L + 2430 = 18L + 2160. 3L = 2430 - 2160 = 270. L = 90 m."
            },
            {
                id: 15,
                question: "A train is 125 m long. If the train takes 30 seconds to cross a tree by the railway line, then the speed of the train is:",
                options: ["14 km/h", "15 km/h", "16 km/h", "12 km/h"],
                answer: "15 km/h",
                explanation: "Distance = Length of the train = 125 m. Time = 30 s. Speed = 125 / 30 m/s. Convert speed to km/h: Speed = (125 / 30) x (18 / 5) = (25 / 6) x (18 / 5) = 5 x 3 = 15 km/h."
            },
            {
                id: 16,
                question: "A train 360 m long is running at a speed of 45 km/h. In what time will it pass a bridge 140 m long?",
                options: ["30 sec", "35 sec", "40 sec", "45 sec"],
                answer: "40 sec",
                explanation: "Total Distance = 360 + 140 = 500 m. Speed = 45 km/h = 45 x 5/18 = 12.5 m/s. Time = 500 / 12.5 = 5000 / 125 = 40 seconds."
            },
            {
                id: 17,
                question: "A 240-meter long train passes a 300-meter long platform in 27 seconds. What is the speed of the train in km/h?",
                options: ["64 km/h", "68 km/h", "72 km/h", "76 km/h"],
                answer: "72 km/h",
                explanation: "Total Distance = 240 + 300 = 540 m. Time = 27 s. Speed = 540 / 27 = 20 m/s. Convert speed to km/h: Speed = 20 x 18/5 = 4 x 18 = 72 km/h."
            },
            {
                id: 18,
                question: "A train running at a uniform speed passes a bridge 275 m long in 15 seconds and another bridge 425 m long in 21 seconds. The speed of the train is:",
                options: ["20 m/s", "22 m/s", "25 m/s", "30 m/s"],
                answer: "25 m/s",
                explanation: "The train travels an extra distance of 425 - 275 = 150 m in 21 - 15 = 6 seconds. Speed = Difference in distance / Difference in time = 150 / 6 = 25 m/s."
            },
            {
                id: 19,
                question: "A train 800 metres long is running at a speed of 78 km/h. If it crosses a tunnel in 1 minute, then the length of the tunnel is:",
                options: ["500 m", "520 m", "540 m", "560 m"],
                answer: "500 m",
                explanation: "Speed = 78 km/h = 78 x 5/18 = 65/3 m/s. Time = 1 minute = 60 s. Total Distance = Speed x Time = (65/3) x 60 = 65 x 20 = 1300 m. Length of tunnel = Total Distance - Length of train = 1300 - 800 = 500 m."
            },
            {
                id: 20,
                question: "A train 280-meter long crosses a platform thrice its length in 56 seconds. What is the speed of the train in km/h?",
                options: ["64 km/h", "72 km/h", "80 km/h", "90 km/h"],
                answer: "72 km/h",
                explanation: "Length of platform = 3 x 280 = 840 m. Total Distance = 280 + 840 = 1120 m. Time = 56 s. Speed = 1120 / 56 = 20 m/s. Convert speed to km/h: Speed = 20 x 18/5 = 72 km/h."
            },
            {
                id: 21,
                question: "Two trains of length 120 m and 80 m are running in opposite directions with velocities of 42 km/h and 30 km/h. In what time will they cross each other?",
                options: ["8 sec", "10 sec", "12 sec", "15 sec"],
                answer: "10 sec",
                explanation: "When moving in opposite directions, the relative speed is the sum of their speeds. Relative Speed = 42 + 30 = 72 km/h. Convert relative speed to m/s: 72 x 5/18 = 20 m/s. Total distance to be covered = Sum of their lengths = 120 + 80 = 200 m. Time = Total Distance / Relative Speed = 200 / 20 = 10 seconds."
            },
            {
                id: 22,
                question: "Two trains are moving in opposite directions at 60 km/h and 90 km/h. Their lengths are 1.10 km and 0.9 km respectively. The time taken by the slower train to cross the faster train is:",
                options: ["36 sec", "45 sec", "48 sec", "52 sec"],
                answer: "48 sec",
                explanation: "Relative Speed = 60 + 90 = 150 km/h. Convert speed to m/s: 150 x 5/18 = 125/3 m/s. Total distance = Sum of lengths = 1.10 km + 0.9 km = 2 km = 2000 m. Time = 2000 / (125/3) = (2000 x 3) / 125 = 16 x 3 = 48 seconds."
            },
            {
                id: 23,
                question: "A train 150 m long is running with a speed of 52 km/h. In what time will it pass a man who is running at 8 km/h in the opposite direction?",
                options: ["6 sec", "8 sec", "9 sec", "10 sec"],
                answer: "9 sec",
                explanation: "Relative Speed = 52 + 8 = 60 km/h. Convert speed to m/s: 60 x 5/18 = 50/3 m/s. Distance = Length of the train = 150 m. Time = 150 / (50/3) = (150 x 3) / 50 = 3 x 3 = 9 seconds."
            },
            {
                id: 24,
                question: "Two trains, 130 m and 110 m long, are going in the opposite direction. The first train runs at a speed of 62 km/h and the second train at 46 km/h. How long will they take to cross each other?",
                options: ["6 sec", "8 sec", "10 sec", "12 sec"],
                answer: "8 sec",
                explanation: "Relative Speed = 62 + 46 = 108 km/h. Convert speed to m/s: 108 x 5/18 = 30 m/s. Total distance = 130 + 110 = 240 m. Time = 240 / 30 = 8 seconds."
            },
            {
                id: 25,
                question: "A train 100 m long travels at 50 km/h. How long does it take to cross another train 150 m long, running in the opposite direction at 40 km/h?",
                options: ["8 sec", "9 sec", "10 sec", "11 sec"],
                answer: "10 sec",
                explanation: "Relative Speed = 50 + 40 = 90 km/h. Convert speed to m/s: 90 x 5/18 = 25 m/s. Total distance = 100 + 150 = 250 m. Time = 250 / 25 = 10 seconds."
            },
            {
                id: 26,
                question: "A 270 meters long train running at the speed of 120 kmph crosses another train running in the opposite direction at a speed of 80 kmph in 9 seconds. What is the length of the other train?",
                options: ["230 m", "240 m", "260 m", "320 m"],
                answer: "230 m",
                explanation: "Relative Speed = 120 + 80 = 200 kmph. Convert speed to m/s: 200 x 5/18 = 500/9 m/s. Total Distance = Relative Speed x Time = (500/9) x 9 = 500 m. Length of other train = Total Distance - Length of first train = 500 - 270 = 230 m."
            },
            {
                id: 27,
                question: "Two trains are running in opposite directions with the same speed. If the length of each train is 120 meters and they cross each other in 12 seconds, then the speed of each train (in km/h) is:",
                options: ["36", "42", "54", "72"],
                answer: "36",
                explanation: "Let the speed of each train be S km/h. Relative Speed = S + S = 2S km/h. Total distance = 120 + 120 = 240 m. Time = 12 s. Relative Speed in m/s = 240 / 12 = 20 m/s. Now, 2S km/h = 20 m/s. 2S x 5/18 = 20. 2S = 20 x 18/5 = 72. S = 36 km/h."
            },
            {
                id: 28,
                question: "A train 110 metres long is running with a speed of 60 kmph. In what time will it pass a man who is running at 6 kmph in the direction opposite to that of the train?",
                options: ["5 sec", "6 sec", "7 sec", "10 sec"],
                answer: "6 sec",
                explanation: "Relative Speed = 60 + 6 = 66 kmph. Convert speed to m/s: 66 x 5/18 = 55/3 m/s. Distance = 110 m. Time = 110 / (55/3) = (110 x 3) / 55 = 2 x 3 = 6 seconds."
            },
            {
                id: 29,
                question: "A train 108 m long moving at a speed of 50 km/h crosses a train 112 m long coming from the opposite direction in 6 seconds. The speed of the second train is:",
                options: ["48 km/h", "54 km/h", "66 km/h", "82 km/h"],
                answer: "82 km/h",
                explanation: "Total distance = 108 + 112 = 220 m. Time = 6 s. Relative Speed (in m/s) = 220 / 6 = 110/3 m/s. Convert relative speed to km/h: (110/3) x (18/5) = 22 x 6 = 132 km/h. Let the speed of the second train be S. Relative Speed = 50 + S = 132. S = 132 - 50 = 82 km/h."
            },
            {
                id: 30,
                question: "A train 220 m long is running with a speed of 59 km/h. In what time will it pass a man who is running at 7 km/h in the direction opposite to that of the train?",
                options: ["10 sec", "11 sec", "12 sec", "13 sec"],
                answer: "12 sec",
                explanation: "Relative Speed = 59 + 7 = 66 km/h. Convert speed to m/s: 66 x 5/18 = 55/3 m/s. Distance = 220 m. Time = 220 / (55/3) = (220 x 3) / 55 = 4 x 3 = 12 seconds"
            }
        ]
    }
};

// Function to get practice test by topic
export const getPracticeTest = (topic) => {
    return practiceTests[topic] || null;
};

// Function to get all practice test topics
export const getPracticeTestTopics = () => {
    return Object.keys(practiceTests);
};
