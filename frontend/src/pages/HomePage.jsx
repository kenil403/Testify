import {
  BookOpenIcon,
  ChartBarIcon,
  LightBulbIcon,
  TrophyIcon,
} from "../components/icons/Icons";

export default function HomePage({ navigate }) {
  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <header className="text-center py-20 bg-green-50 rounded-lg shadow-sm">
        <span className="bg-amber-200 text-amber-800 px-4 py-1 rounded-full text-sm font-medium">
          Your Placement Journey Starts Here
        </span>
        <h1 className="text-5xl font-extrabold text-green-800 my-6">
          Welcome to Testify
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          The ultimate platform to prepare for your campus placements. Access
          comprehensive learning materials, take realistic mock tests, and track
          your progress to ace your interviews.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("learn")}
            className="px-8 py-3 bg-amber-400 text-green-900 font-bold rounded-full shadow hover:bg-amber-500 transition"
          >
            Start Learning
          </button>
          <button
            onClick={() => navigate("test-selection")}
            className="px-8 py-3 bg-green-600 text-white font-bold rounded-full shadow hover:bg-green-700 transition"
          >
            Conduct Test
          </button>
        </div>
      </header>

      {/* Why Choose Testify */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Testify?</h2>
        <p className="text-slate-600 mb-12">
          Everything you need to succeed, all in one place.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex justify-center">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                <BookOpenIcon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-semibold mt-4">Curated Study Material</h3>
            <p className="text-slate-600 mt-2 text-sm">
              Access PDFs and notes organized by subject and specialization,
              tailored for placement success.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex justify-center">
              <div className="w-12 h-12 flex items-center justify-center bg-amber-100 text-amber-500 rounded-full">
                <TrophyIcon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-semibold mt-4">Realistic Tests</h3>
            <p className="text-slate-600 mt-2 text-sm">
              Experience real-time, timed tests with unique question sets for
              every attempt to sharpen your skills.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex justify-center">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                <ChartBarIcon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="font-semibold mt-4">Performance Dashboard</h3>
            <p className="text-slate-600 mt-2 text-sm">
              Track your progress, view scores, analyze solutions, and see your
              rank among peers.
            </p>
          </div>
        </div>
      </section>

      {/* Path to Success */}
      <section className="py-20 bg-slate-50 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-4">
          Your Path to Placement Success
        </h2>
        <p className="text-slate-600 text-center mb-12">
          A simple, three-step process to get you interview-ready.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Step 1 */}
          <div>
            <div className="w-12 h-12 flex items-center justify-center bg-amber-100 text-amber-500 rounded-full mx-auto">
              <LightBulbIcon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mt-4">1. Explore & Learn</h3>
            <p className="text-slate-600 mt-2 text-sm">
              Dive into our vast library of study materials for various subjects
              and domains.
            </p>
          </div>
          {/* Step 2 */}
          <div>
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mx-auto">
              <ChartBarIcon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mt-4">2. Practice & Test</h3>
            <p className="text-slate-600 mt-2 text-sm">
              Take timed mock tests to improve your speed, accuracy, and
              confidence.
            </p>
          </div>
          {/* Step 3 */}
          <div>
            <div className="w-12 h-12 flex items-center justify-center bg-amber-100 text-amber-500 rounded-full mx-auto">
              <TrophyIcon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mt-4">3. Analyze & Succeed</h3>
            <p className="text-slate-600 mt-2 text-sm">
              Review detailed solutions and track your performance to ace the
              final interview.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
  <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white text-center rounded-lg mt-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning?</h2>
        <p className="mb-6">
          Join thousands of students who trust Testify for their placement
          preparation. Your dream job is just a few clicks away.
        </p>
        <button
          onClick={() => navigate("auth")}
          className="px-8 py-3 bg-amber-400 text-green-900 font-bold rounded-full shadow hover:bg-amber-500 transition"
        >
          Get Started for Free
        </button>
      </section>
    </div>
  );
}
