"use client";

import { useState } from "react";

type Week = { title: string; tasks: string[] };

export default function RoadMap() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<Week[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Simulated response — replace with your API call
      const fakeRoadmap: Week[] = [
        {
          title: "Week 1: Understand Basics",
          tasks: [
            "Read introductory articles about the topic",
            "Watch beginner tutorials",
            "Take notes on key concepts",
          ],
        },
        {
          title: "Week 2: Learn Core Concepts",
          tasks: [
            "Understand the main principles and theories",
            "Watch focused video lessons",
            "Try a few simple exercises",
          ],
        },
        {
          title: "Week 3: Practice Exercises",
          tasks: [
            "Solve beginner exercises",
            "Ask questions in a community",
            "Review mistakes and retry",
          ],
        },
        {
          title: "Week 4: Apply Knowledge",
          tasks: [
            "Build a small project",
            "Write a short summary of your process",
            "Share for feedback",
          ],
        },
        {
          title: "Week 5: Deepen Understanding",
          tasks: [
            "Read advanced articles or papers",
            "Add new features to your project",
            "Organize your notes",
            "Teach a concept to someone",
          ],
        },
        {
          title: "Week 6: Review & Test",
          tasks: [
            "Take practice tests or quizzes",
            "Focus on weak areas",
            "Redo challenging exercises",
          ],
        },
        {
          title: "Week 7: Real-World Application",
          tasks: [
            "Solve real case studies",
            "Collaborate on a mini project",
            "Apply knowledge to a personal problem",
          ],
        },
        {
          title: "Week 8: Reflection & Next Steps",
          tasks: [
            "Write a comprehensive summary",
            "Plan next topics",
            "Set a schedule for continued learning",
          ],
        },
      ];

      // simulate delay
      await new Promise((r) => setTimeout(r, 600));
      setResult(fakeRoadmap);
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Generate Your Learning Roadmap
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Topic (e.g. React, Machine Learning...)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 rounded w-full"
          aria-label="Topic"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      <section>
        {result && (
          <div className="grid gap-4 md:grid-cols-2">
            {result.map((week, i) => (
              <article key={i} className="border rounded p-4 shadow-sm">
                <h2 className="font-medium mb-2">{week.title}</h2>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {week.tasks.map((task, j) => (
                    <li key={j} className="mb-1">
                      {task}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
