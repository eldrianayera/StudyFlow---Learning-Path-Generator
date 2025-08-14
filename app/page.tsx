import Link from "next/link";

export default function Home() {
  return (
    <main className="font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-100 to-white min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">StudyFlow</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-12">
          AI-powered learning tracker that creates custom study plans, tracks
          your progress, and keeps you motivated to achieve your goals.
        </p>
        <div className="w-full max-w-3xl h-64 bg-gray-200 rounded-xl shadow-lg flex justify-center items-center text-gray-400">
          {/* Placeholder for hero illustration */}
          Hero Image / Screenshot
        </div>
        <Link
          href="roadmap"
          className="h-10 border-2 m-5 rounded-full p-4 flex-center"
        >
          Generate RoadMap
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor your learning streaks and milestones with intuitive
              dashboards.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Study Plans</h3>
            <p className="text-gray-600">
              Receive personalized study plans tailored to your goals and pace.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Notes & Quizzes</h3>
            <p className="text-gray-600">
              Generate AI summaries and quizzes to reinforce your learning
              efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-50 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">
                1. Create Your Learning Path
              </h3>
              <p className="text-gray-700">
                Enter your topic and goals, and StudyFlow generates a
                personalized study roadmap.
              </p>
            </div>
            <div className="md:w-1/2 h-48 bg-gray-200 rounded-xl flex justify-center items-center text-gray-400">
              Illustration / Screenshot
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 ">
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">2. Track Progress</h3>
              <p className="text-gray-700">
                Log your daily study sessions, track your streaks, and see
                visual insights of your growth.
              </p>
            </div>
            <div className="md:w-1/2 h-48 bg-gray-200 rounded-xl flex justify-center items-center text-gray-400">
              Illustration / Screenshot
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-2">
                3. Reinforce Learning
              </h3>
              <p className="text-gray-700">
                Generate AI-powered summaries and quizzes to review and retain
                knowledge effectively.
              </p>
            </div>
            <div className="md:w-1/2 h-48 bg-gray-200 rounded-xl flex justify-center items-center text-gray-400">
              Illustration / Screenshot
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} StudyFlow. All rights reserved.
      </footer>
    </main>
  );
}
