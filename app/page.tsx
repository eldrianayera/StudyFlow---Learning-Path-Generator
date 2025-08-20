import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-background text-foreground font-sans">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: i % 2 ? "var(--primary)" : "var(--secondary)",
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(40px)",
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="flex-center text-center px-6 relative z-10 mt-22 ">
        <div className="max-w-4xl space-y-8">
          <div className="inline-block bg-primary/10 px-6 py-2 rounded-full border border-primary/20 mb-4">
            <span className="text-primary font-medium">
              AI-Powered Learning
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
            Master Anything with{" "}
            <span className="text-secondary">StudyFlow</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-foreground/80">
            Transform how you learn with personalized study plans, progress
            tracking, and AI-powered tools to maximize your potential.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/generate-roadmap"
              className="bg-primary text-background px-8 py-4 rounded-lg text-lg font-medium hover:bg-secondary transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/20"
            >
              Start Learning Journey →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your Complete <span className="text-primary">Learning</span>{" "}
              Toolkit
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-foreground/80">
              Everything you need to learn effectively and track your progress
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Progress Tracking",
                description:
                  "Visual dashboards show your learning streaks, milestones, and growth over time.",
                features: [
                  "Daily streaks",
                  "Progress charts",
                  "Achievement badges",
                ],
              },
              {
                icon: "🤖",
                title: "AI Study Plans",
                description:
                  "Personalized roadmaps tailored to your goals, schedule, and learning style.",
                features: [
                  "Custom schedules",
                  "Adaptive pacing",
                  "Topic breakdowns",
                ],
              },
              {
                icon: "📝",
                title: "Smart Reviews",
                description:
                  "AI-generated summaries and quizzes to reinforce what you learn.",
                features: [
                  "Spaced repetition",
                  "Knowledge checks",
                  "Focus areas",
                ],
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-background rounded-xl border border-foreground/10 p-8 hover:border-primary transition-all hover:shadow-xl group"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-primary">
                  {feature.title}
                </h3>
                <p className="mb-4 text-foreground/90">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-secondary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-foreground/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple <span className="text-primary">Process</span>, Powerful
              Results
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-foreground/80">
              Get started in minutes and see immediate benefits
            </p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-8 md:left-1/2 h-full w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-12 md:space-y-0">
              {[
                {
                  step: "1",
                  title: "Define Your Goals",
                  description:
                    "Tell us what you want to learn and your current level. Our AI analyzes your needs.",
                  icon: "✏️",
                },
                {
                  step: "2",
                  title: "Get Your Plan",
                  description:
                    "Receive a personalized roadmap with weekly milestones and daily tasks.",
                  icon: "📅",
                },
                {
                  step: "3",
                  title: "Learn & Track",
                  description:
                    "Follow your plan, log progress, and get adaptive recommendations.",
                  icon: "📊",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative md:flex md:items-center md:even:flex-row-reverse"
                >
                  <div className="md:w-1/2 md:px-12 mb-4 md:mb-0">
                    <div className="bg-background border border-foreground/10 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <div className="text-primary text-xl font-medium mb-2">
                        Step {item.step}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-foreground/90">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2">
                    <div
                      className={`h-1 w-8 bg-primary absolute ${
                        index === 2 ? "hidden" : ""
                      }`}
                    ></div>
                    <div className="w-16 h-16 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center text-primary text-xl font-bold absolute left-1/2 -translate-x-1/2">
                      {item.step}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Loved by <span className="text-primary">Learners</span> Worldwide
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-foreground/80">
              Join thousands whom transformed their learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "StudyFlow helped me organize my coding journey. I went from beginner to landing my first developer job in 6 months!",
                author: "Sarah K.",
                role: "Frontend Developer",
              },
              {
                quote:
                  "The AI-generated study plans adapt to my progress and keep me motivated. I have never learned so efficiently.",
                author: "Michael T.",
                role: "Data Science Student",
              },
              {
                quote:
                  "Finally a tool that actually helps me retain what I learn. The spaced repetition and quizzes are game-changers.",
                author: "Priya M.",
                role: "Medical Student",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-background border border-foreground/10 rounded-xl p-8 hover:border-primary transition-all hover:shadow-lg"
              >
                <div className="text-primary text-4xl mb-4">&quot;</div>
                <p className="text-lg mb-6 italic text-foreground/90">
                  {testimonial.quote}
                </p>
                <div className="border-t border-foreground/10 pt-4">
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-foreground/70">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary/10 to-secondary/10 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-primary">Transform</span> Your
            Learning?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-foreground/80">
            Join StudyFlow today and experience the future of personalized
            learning
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/sign-up"
              className="bg-primary text-background px-8 py-4 rounded-lg text-lg font-medium hover:bg-secondary transition-all transform hover:scale-105 shadow-lg hover:shadow-primary/20"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-foreground/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            StudyFlow
          </Link>
          <div className="mt-8 text-center text-foreground/70 text-sm">
            &copy; {new Date().getFullYear()} StudyFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
