// Aptitude Test Bank - Paper 1 with exactly 60 MCQs from user's provided aptitude paper
// Reduced from 100 to 60 questions with 60 minutes duration

export const aptitudePapers = [
    {
        paperId: "paper1",
        name: "Aptitude Paper 1 - Comprehensive",
        duration: 60, // minutes
        totalQuestions: 60,
        questions: [
            // Questions 1-10
            { id: 1, question: "A train 150 meters long is running at a speed of 72 kilometers per hour. In what time will it pass a telegraph pole?", 
              options: ["5.5 seconds", "6.5 seconds", "7.5 seconds", "8.5 seconds"], 
              answer: "7.5 seconds", 
              explanation: "Speed = 72 * (5/18) = 20 m/s. Time = Distance / Speed = 150 / 20 = 7.5 seconds." },
            
            { id: 2, question: "A train 240 meters long passes a platform 300 meters long in 27 seconds. What is the speed of the train in kilometers per hour?", 
              options: ["60 km/hr", "72 km/hr", "80 km/hr", "90 km/hr"], 
              answer: "72 km/hr", 
              explanation: "Speed = (240 + 300) / 27 = 20 m/s. Convert to km/hr: 20 * (18/5) = 72 km/hr." },

            { id: 3, question: "Two trains of lengths 120 meters and 80 meters are running in opposite directions with velocities of 42 kilometers per hour and 30 kilometers per hour. In what time will they completely cross each other?", 
              options: ["8 seconds", "10 seconds", "12 seconds", "14 seconds"], 
              answer: "10 seconds", 
              explanation: "Relative Speed = 42 + 30 = 72 km/hr = 20 m/s. Total Distance = 120 + 80 = 200 m. Time = 200 / 20 = 10 seconds." },

            { id: 4, question: "A car covers a distance of 690 kilometers in 30 hours. What is the speed of the car?", 
              options: ["21 km/hr", "23 km/hr", "25 km/hr", "27 km/hr"], 
              answer: "23 km/hr", 
              explanation: "Speed = Distance / Time = 690 / 30 = 23 km/hr." },

            { id: 5, question: "A person travels from P to Q at a speed of 40 kilometers per hour and returns by increasing his speed by 50%. What is his average speed for both trips?", 
              options: ["45 km/hr", "48 km/hr", "50 km/hr", "52 km/hr"], 
              answer: "48 km/hr", 
              explanation: "Return speed = 40 * 1.5 = 60 km/hr. Average speed = (2 * 40 * 60) / (40 + 60) = 48 km/hr." },

            { id: 6, question: "A cyclist is moving at a speed of 15 meters per second. What is the speed in kilometers per hour?", 
              options: ["48 km/hr", "50 km/hr", "52 km/hr", "54 km/hr"], 
              answer: "54 km/hr", 
              explanation: "To convert m/s to km/hr, multiply by 18/5. Speed = 15 * (18/5) = 54 km/hr." },

            { id: 7, question: "The angle of elevation of the top of a tower from a point 30 m away from its foot is 30°. What is the height of the tower?", 
              options: ["30 m", "30√3 m", "10 m", "10√3 m"], 
              answer: "10√3 m", 
              explanation: "Height = Distance * tan(angle) = 30 * tan(30°) = 30 * (1/√3) = 10√3 m." },

            { id: 8, question: "A pole 6 m high casts a shadow 2√3 m long on the ground. The sun's elevation is:", 
              options: ["30°", "45°", "60°", "90°"], 
              answer: "60°", 
              explanation: "tan(θ) = Height/Shadow = 6 / (2√3) = √3. The angle for which tan is √3 is 60°." },

            { id: 9, question: "From the top of a cliff 150 m high, the angle of depression of a boat is 60°. Find the distance of the boat from the cliff.", 
              options: ["50√3 m", "150√3 m", "50 m", "150 m"], 
              answer: "50√3 m", 
              explanation: "Distance = Height / tan(angle) = 150 / tan(60°) = 150 / √3 = 50√3 m." },

            { id: 10, question: "A can do a piece of work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:", 
              options: ["7/15", "8/15", "1/4", "1/10"], 
              answer: "8/15", 
              explanation: "Work done in 4 days = 4 * (1/15 + 1/20) = 7/15. Remaining work = 1 - 7/15 = 8/15." },

            // Questions 11-20
            { id: 11, question: "A is twice as good a workman as B and together they finish a piece of work in 14 days. In how many days can A alone finish the work?", 
              options: ["11 days", "21 days", "28 days", "42 days"], 
              answer: "21 days", 
              explanation: "Let A take 'x' days, B takes '2x' days. (1/x) + (1/2x) = 1/14, which gives x = 21 days." },

            { id: 12, question: "A and B can do a job in 12 days, B and C in 16 days, and A and C in 24 days. How many days will A, B, and C take to complete the job together?", 
              options: ["32/3 days", "16/3 days", "30/3 days", "10 days"], 
              answer: "32/3 days", 
              explanation: "2(A+B+C)'s 1-day work = 1/12 + 1/16 + 1/24 = 9/48. So, (A+B+C) take 2 * 48/9 = 32/3 days." },

            { id: 13, question: "P can finish a work in 18 days. Q can finish the same work in 15 days. Q worked for 10 days and left. In how many days, P alone can finish the remaining work?", 
              options: ["5 days", "5.5 days", "6 days", "8 days"], 
              answer: "6 days", 
              explanation: "Work done by Q = 10/15 = 2/3. Remaining work = 1/3. Time for P = (1/3) / (1/18) = 6 days." },

            { id: 14, question: "Find the simple interest on ₹5000 for 2 years at 8% per annum.", 
              options: ["₹700", "₹800", "₹900", "₹1000"], 
              answer: "₹800", 
              explanation: "SI = (Principal * Rate * Time) / 100 = (5000 * 8 * 2) / 100 = ₹800." },

            { id: 15, question: "A sum amounts to ₹9800 after 5 years and ₹12005 after 8 years at the same rate of simple interest. The rate of interest per annum is:", 
              options: ["5%", "8%", "12%", "15%"], 
              answer: "12%", 
              explanation: "SI for 3 years = 2205, so SI per year = 735. Principal = 9800 - (5*735) = 6125. Rate = (735/6125)*100 = 12%." },

            { id: 16, question: "In what time will ₹1000 become ₹1331 at 10% per annum compounded annually?", 
              options: ["2 years", "2.5 years", "3 years", "3.5 years"], 
              answer: "3 years", 
              explanation: "1331/1000 = (11/10)³. This is (1 + 10/100)³, so the time is 3 years." },

            { id: 17, question: "Find the compound interest on ₹8000 for 2 years at 5% per annum.", 
              options: ["₹800", "₹810", "₹820", "₹830"], 
              answer: "₹820", 
              explanation: "Amount = 8000 * (1.05)² = 8820. CI = Amount - Principal = 8820 - 8000 = ₹820." },

            { id: 18, question: "What will be the amount if a sum of ₹10,000 is placed at compound interest for 3 years at a rate of 10% per annum?", 
              options: ["₹12,310", "₹13,000", "₹13,310", "₹14,310"], 
              answer: "₹13,310", 
              explanation: "Amount = 10000 * (1.1)³ = 10000 * 1.331 = ₹13,310." },

            { id: 19, question: "The difference between simple and compound interest on ₹1200 for one year at 10% per annum, reckoned half-yearly is:", 
              options: ["₹2.50", "₹3", "₹3.75", "₹4"], 
              answer: "₹3", 
              explanation: "SI = 120. CI (half-yearly) = 1200 * (1.05)² - 1200 = 123. Difference = 123 - 120 = ₹3." },

            { id: 20, question: "A man buys an article for ₹27.50 and sells it for ₹28.60. Find his gain percent.", 
              options: ["2%", "3%", "4%", "5%"], 
              answer: "4%", 
              explanation: "Gain = 28.60 - 27.50 = 1.10. Gain % = (1.10 / 27.50) * 100 = 4%." },

            // Questions 21-30
            { id: 21, question: "If the cost price of 12 pens is equal to the selling price of 8 pens, the gain percent is:", 
              options: ["25%", "33.33%", "50%", "66.66%"], 
              answer: "50%", 
              explanation: "Gain % = [(Goods Left) / (Goods Sold)] * 100 = [(12-8)/8] * 100 = 50%." },

            { id: 22, question: "By selling an article for ₹450, a man loses 10%. At what price should he sell it to gain 10%?", 
              options: ["₹500", "₹525", "₹550", "₹600"], 
              answer: "₹550", 
              explanation: "Cost Price = 450 * (100/90) = ₹500. New SP for 10% gain = 500 * (110/100) = ₹550." },

            { id: 23, question: "A shopkeeper sells a transistor at ₹840 at a gain of 20% and another for ₹960 at a loss of 4%. His total gain or loss percent is:", 
              options: ["5 15/17% loss", "5 15/17% gain", "6 2/3% gain", "6 2/3% loss"], 
              answer: "5 15/17% gain", 
              explanation: "Total CP = (840*100/120) + (960*100/96) = 700 + 1000 = ₹1700. Total SP = 840+960=₹1800. Gain% = (100/1700)*100 = 5 15/17%." },

            { id: 24, question: "A, B and C started a business investing ₹1,20,000, ₹1,35,000 and ₹1,50,000. Find A's share from a profit of ₹56,700.", 
              options: ["₹16,800", "₹18,900", "₹21,000", "₹15,500"], 
              answer: "₹16,800", 
              explanation: "Investment Ratio = 120:135:150 = 8:9:10. A's share = (8/27) * 56700 = ₹16,800." },

            { id: 25, question: "A starts a business with ₹3500. B joins after 5 months. After a year, the profit ratio is 2:3. What is B's capital?", 
              options: ["₹7500", "₹8000", "₹8500", "₹9000"], 
              answer: "₹9000", 
              explanation: "(3500 * 12) / (B's Capital * 7) = 2/3. Solving for B's Capital gives ₹9000." },

            { id: 26, question: "A and B invest in the ratio 3:2. If 5% of the total profit goes to charity and A's share is ₹855, the total profit is:", 
              options: ["₹1425", "₹1500", "₹1537.50", "₹1976"], 
              answer: "₹1500", 
              explanation: "A's share is (3/5) of 95% of total profit. 855 = 0.6 * 0.95 * P. Total Profit (P) = ₹1500." },

            { id: 27, question: "What is 25% of 200?", 
              options: ["25", "50", "75", "100"], 
              answer: "50", 
              explanation: "25% of 200 = (25/100) * 200 = 50." },

            { id: 28, question: "If the price of a book is first decreased by 25% and then increased by 20%, the net change in the price will be:", 
              options: ["10% decrease", "5% decrease", "No change", "10% increase"], 
              answer: "10% decrease", 
              explanation: "Let price be 100. After decrease: 75. After increase: 75 * 1.20 = 90. The net change is a 10% decrease." },

            { id: 29, question: "A student needs 40% to pass. He gets 178 marks and fails by 22 marks. The maximum marks are:", 
              options: ["200", "300", "500", "1000"], 
              answer: "500", 
              explanation: "Passing marks = 178 + 22 = 200. This is 40% of the maximum. Max Marks = 200 / 0.40 = 500." },

            { id: 30, question: "Express the fraction 3/4 as a percentage.", 
              options: ["25%", "50%", "75%", "60%"], 
              answer: "75%", 
              explanation: "To convert a fraction to a percentage, multiply by 100. (3/4) * 100 = 75%." },

            // Questions 31-40
            { id: 31, question: "Present ages of two brothers are in ratio 1:2. 5 years ago, the ratio was 1:3. What is the ratio after 5 years?", 
              options: ["1:4", "2:3", "3:5", "5:6"], 
              answer: "3:5", 
              explanation: "Ages are x, 2x. (x-5)/(2x-5)=1/3 => x=10. Present ages are 10, 20. After 5 yrs: 15, 25. The ratio is 3:5." },

            { id: 32, question: "The sum of the ages of a father and son is 60. Six years ago, the father's age was 5 times the son's. After 6 years, son's age will be:", 
              options: ["14 years", "20 years", "22 years", "24 years"], 
              answer: "20 years", 
              explanation: "Let present ages be F and S. F+S=60 and F-6=5(S-6). Solving gives S=14. Son's age after 6 years will be 14+6=20." },

            { id: 33, question: "Rajan's present age is 6/5 of his age at marriage 8 years ago. His sister was 10 years younger. Find his sister's present age.", 
              options: ["32 years", "36 years", "38 years", "40 years"], 
              answer: "38 years", 
              explanation: "Let present age be x. x = (6/5)(x-8) => x=48. Age at marriage was 40. His sister's age then was 30. Her present age is 30+8=38." },

            { id: 34, question: "If today is Monday, what will be the day after 61 days?", 
              options: ["Wednesday", "Saturday", "Tuesday", "Thursday"], 
              answer: "Saturday", 
              explanation: "61 divided by 7 leaves remainder of 5. Day will be Monday + 5 days, which is Saturday." },

            { id: 35, question: "Which of the following is a leap year?", 
              options: ["1900", "1800", "2000", "2100"], 
              answer: "2000", 
              explanation: "A century year is a leap year only if it is divisible by 400." },

            { id: 36, question: "Find the angle between the hour and minute hand of a clock at 3:25.", 
              options: ["45°", "47.5°", "50°", "52.5°"], 
              answer: "47.5°", 
              explanation: "Angle = |(30*Hour)-(11/2*Minute)| = |(30*3)-(11/2*25)| = |90-137.5| = 47.5°." },

            { id: 37, question: "At what time between 4 and 5 o'clock will the hands of a clock be at a right angle?", 
              options: ["4:38", "4:05 5/11", "4:40", "Both A and B"], 
              answer: "4:05 5/11", 
              explanation: "The hands are at right angle twice. The first instance occurs when minute hand has gained 5 minutes on the hour hand, which is at 5 and 5/11 minutes past 4." },

            { id: 38, question: "What is the average of the first 50 natural numbers?", 
              options: ["25", "25.5", "26", "26.5"], 
              answer: "25.5", 
              explanation: "Average = (First number + Last number) / 2 = (1 + 50) / 2 = 25.5." },

            { id: 39, question: "The average age of 39 students is 15 years. If the teacher's age is included, the average increases by 3 months. Find the teacher's age.", 
              options: ["25 years", "23 years", "27 years", "28 years"], 
              answer: "25 years", 
              explanation: "Teacher's age = New Average + (Old Count * Increase) = 15.25+(39*0.25) = 25 years." },

            { id: 40, question: "A man travels at 60 km/hr from A to B and returns at 100 km/hr. Find the average speed.", 
              options: ["75 km/hr", "80 km/hr", "70 km/hr", "85 km/hr"], 
              answer: "75 km/hr", 
              explanation: "Average speed = (2*S1*S2)/(S1+S2) = (2*60*100)/(60+100) = 75 km/hr." },

            // Questions 41-50
            { id: 41, question: "Length of a rectangle is 20m more than breadth. Fencing cost is ₹5300 at ₹26.50/m. Find the length.", 
              options: ["40 meters", "50 meters", "60 meters", "70 meters"], 
              answer: "60 meters", 
              explanation: "Perimeter = 5300/26.50 = 200m. 2(b+20+b)=200 => b=40. Length = 40+20=60m." },

            { id: 42, question: "What is the area of a circle whose circumference is 44 cm?", 
              options: ["154 cm²", "144 cm²", "164 cm²", "174 cm²"], 
              answer: "154 cm²", 
              explanation: "2πr = 44 => r=7. Area = πr² = (22/7)*49 = 154 cm²." },

            { id: 43, question: "The diagonal of a square is 4√2 cm. The area of another square with double the area is:", 
              options: ["16 cm²", "32 cm²", "64 cm²", "128 cm²"], 
              answer: "32 cm²", 
              explanation: "Area of 1st square = (Diagonal)²/2 = 32/2 = 16. Area of 2nd square = 2*16 = 32 cm²." },

            { id: 44, question: "What is the volume of a cube with a side length of 6 cm?", 
              options: ["144 cm³", "180 cm³", "216 cm³", "256 cm³"], 
              answer: "216 cm³", 
              explanation: "Volume = (side)³ = 6³ = 216 cm³." },

            { id: 45, question: "The length, breadth, and height of a room are 12m, 10m, and 8m. Find the total surface area.", 
              options: ["428 m²", "512 m²", "592 m²", "624 m²"], 
              answer: "592 m²", 
              explanation: "Total Surface Area = 2 * (lb + bh + hl) = 2 * (12*10 + 10*8 + 8*12) = 2 * (120 + 80 + 96) = 592 m²." },

            { id: 46, question: "The radius and height of a cylinder are in the ratio 5:7 and its volume is 550 cm³. Find its radius.", 
              options: ["5 cm", "6 cm", "7 cm", "10 cm"], 
              answer: "5 cm", 
              explanation: "Let r=5x, h=7x. Volume = (22/7)*(5x)²*(7x) = 550. Solving gives x=1. Radius = 5x = 5 cm." },

            { id: 47, question: "In how many ways can the letters of the word 'LEADING' be arranged?", 
              options: ["720", "2520", "5040", "1440"], 
              answer: "5040", 
              explanation: "The word has 7 distinct letters. The number of arrangements is 7! = 5040." },

            { id: 48, question: "From 7 men and 6 women, a committee of five is formed with at least 3 men. In how many ways can it be done?", 
              options: ["564", "645", "735", "756"], 
              answer: "756", 
              explanation: "Ways = (3M, 2W) + (4M, 1W) + (5M) = (⁷C₃×⁶C₂) + (⁷C₄×⁶C₁) + ⁷C₅ = 756." },

            { id: 49, question: "Evaluate ⁸P₃.", 
              options: ["336", "504", "240", "120"], 
              answer: "336", 
              explanation: "⁸P₃ = 8! / (8-3)! = 8 × 7 × 6 = 336." },

            { id: 50, question: "Which of the following is a prime number?", 
              options: ["51", "87", "91", "97"], 
              answer: "97", 
              explanation: "97 is only divisible by 1 and itself. 51=3*17, 87=3*29, 91=7*13." },

            // Questions 51-60 (final set)
            { id: 51, question: "The number 33455672 is divisible by:", 
              options: ["3", "4", "9", "11"], 
              answer: "4", 
              explanation: "A number is divisible by 4 if its last two digits are. 72 is divisible by 4." },

            { id: 52, question: "What is the place value of 5 in the number 357,890?", 
              options: ["5", "500", "5000", "50,000"], 
              answer: "50,000", 
              explanation: "The digit 5 is in the ten thousands place, so its value is 50,000." },

            { id: 53, question: "The sum of two numbers is 40 and their difference is 4. The ratio of the numbers is:", 
              options: ["11:9", "11:10", "21:19", "22:9"], 
              answer: "11:9", 
              explanation: "The numbers are (40+4)/2=22 and (40-4)/2=18. The ratio is 22:18 or 11:9." },

            { id: 54, question: "If one-left of a number decreased by 5 is 5, find the number.", 
              options: ["25", "50", "60", "75"], 
              answer: "50", 
              explanation: "(x/5) - 5 = 5 => x/5 = 10 => x = 50." },

            { id: 55, question: "The sum of three consecutive odd numbers is 57. What is the middle number?", 
              options: ["17", "19", "21", "23"], 
              answer: "19", 
              explanation: "The middle number is the average of the three numbers: 57 / 3 = 19." },

            { id: 56, question: "Find the L.C.M of 24, 36 and 40.", 
              options: ["120", "240", "360", "480"], 
              answer: "360", 
              explanation: "24=2³x3, 36=2²x3², 40=2³x5. L.C.M is highest power of each prime factor: 2³x3²x5 = 360." },

            { id: 57, question: "Find the H.C.F of 96, 144 and 180.", 
              options: ["12", "24", "36", "6"], 
              answer: "12", 
              explanation: "96=2⁵x3, 144=2⁴x3², 180=2²x3²x5. H.C.F is lowest power of common factors: 2²x3 = 12." },

            { id: 58, question: "The H.C.F. of two numbers is 11 and their L.C.M. is 7700. If one number is 275, find the other.", 
              options: ["279", "283", "308", "318"], 
              answer: "308", 
              explanation: "Other number = (HCF * LCM) / First Number = (11 * 7700) / 275 = 308." },

            { id: 59, question: "Convert 3/8 to a decimal fraction.", 
              options: ["0.125", "0.375", "0.425", "0.625"], 
              answer: "0.375", 
              explanation: "3 divided by 8 is 0.375." },

            { id: 60, question: "Choose the odd one out:", 
              options: ["Triangle", "Square", "Circle", "Sphere"], 
              answer: "Sphere", 
              explanation: "A sphere is a three-dimensional (3D) object, while the others are two-dimensional (2D) shapes." }
        ]
    }
];

// Function to get Paper Set 1 (specific paper)
export const getPaperSet1 = () => {
    return aptitudePapers[0]; // Always return the first paper (Paper Set 1)
};

// Function to get random paper
export const getRandomPaper = () => {
    const randomIndex = Math.floor(Math.random() * aptitudePapers.length);
    return aptitudePapers[randomIndex];
};

// Function to get specific paper by ID
export const getPaperById = (paperId) => {
    return aptitudePapers.find(paper => paper.paperId === paperId);
};