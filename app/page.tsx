import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 z-0"></div>
        <div className="relative z-10 max-w-4xl py-7">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
            StudyFlow
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            AI-powered learning tracker that creates custom study plans, tracks
            your progress, and keeps you motivated to achieve your goals.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/roadmap"
              className="bg-primary text-background px-8 py-4 rounded-lg text-lg font-medium hover:bg-secondary transition-colors"
            >
              Generate Your Roadmap
            </Link>
            <div className="w-full max-w-3xl aspect-video bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-foreground/10 flex justify-center items-center">
              <Image
                src="/study.png"
                alt="study"
                width={1265}
                height={1265}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Why StudyFlow</h2>
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto">
            Transform your learning experience with our powerful features
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-foreground/10 hover:border-primary transition-colors">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold mb-4">Progress Tracking</h3>
              <p>
                Monitor your learning streaks and milestones with intuitive
                dashboards that show your growth over time.
              </p>
            </div>
            <div className="p-8 rounded-xl border border-foreground/10 hover:border-primary transition-colors">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-semibold mb-4">AI Study Plans</h3>
              <p>
                Receive personalized study plans tailored to your specific
                goals, schedule, and learning pace.
              </p>
            </div>
            <div className="p-8 rounded-xl border border-foreground/10 hover:border-primary transition-colors">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold mb-4">Smart Reviews</h3>
              <p>
                Generate AI-powered summaries and quizzes to reinforce your
                learning efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-foreground/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto">
            Get started in just a few simple steps
          </p>

          <div className="space-y-12">
            {[
              {
                step: "1",
                title: "Create Your Path",
                description:
                  "Enter your topic and goals, and StudyFlow generates a personalized study roadmap with weekly milestones.",
                icon: "✏️",
              },
              {
                step: "2",
                title: "Track Progress",
                description:
                  "Log your daily study sessions, track your streaks, and see visual insights of your growth.",
                icon: "📈",
              },
              {
                step: "3",
                title: "Reinforce Learning",
                description:
                  "Generate AI-powered summaries and quizzes to review and retain knowledge effectively.",
                icon: "🧠",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-8 items-center bg-background p-6 rounded-xl border border-foreground/10"
              >
                <div className="md:w-1/6 text-5xl">{item.icon}</div>
                <div className="md:w-5/6">
                  <div className="text-primary text-xl font-medium mb-1">
                    Step {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 p-12 rounded-xl border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of learners who are achieving their goals with
            StudyFlow
          </p>
          <Link
            href="/roadmap"
            className="inline-block bg-primary text-background px-8 py-4 rounded-lg text-lg font-medium hover:bg-secondary transition-colors"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-foreground/10 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p>
            &copy; {new Date().getFullYear()} StudyFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
