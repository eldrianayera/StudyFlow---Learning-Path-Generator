"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type Week = { title: string; tasks: string[] };

export default function RoadMap() {
  const [topic, setTopic] = useState<string>("");
  const [level, setLevel] = useState<string>("beginner");
  const [duration, setDuration] = useState<number>(3);
  const [roadmap, setRoadmap] = useState<Week[] | null>(null);
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);
    setRoadmap(null);

    try {
      const res = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level, duration }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        setRoadmap([]);
      } else {
        setRoadmap(data.roadmap);
      }
    } catch (err) {
      console.error(err);
      setRoadmap([]);
    } finally {
      setLoading(false);
    }
  };

  async function handleSave() {
    try {
      await fetch("/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roadmap }),
      });
    } catch (error) {
      return console.error("Fail to Save Roadmap");
    }

    route.push("/dashboard");
  }

  return (
    //  Form Input section
    <div className="bg-background text-foreground p-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Build Your Learning Path
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 mb-8 p-6 rounded-lg bg-foreground/5"
        >
          <div className="space-y-2">
            <label htmlFor="topic" className="font-medium">
              What would you like to master?
            </label>
            <input
              type="text"
              placeholder="Enter a topic (e.g., Advanced JavaScript, Data Science...)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 rounded border border-foreground/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="level" className="font-medium">
              Current skill level
            </label>
            <select
              name="level"
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3 rounded border border-foreground/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="duration" className="font-medium">
              Learning timeline:{" "}
            </label>
            <select
              className="mx-5 px-2 h-10 rounded border border-foreground/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              name="duration"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <span>Months</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-primary text-background font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating Your Path..." : "Generate Roadmap"}
          </button>
        </form>

        {/* Result Section */}
        <section>
          {roadmap ? (
            <div className="grid gap-6">
              {roadmap.map((week, key) => (
                <article
                  key={key}
                  className="border border-foreground/10 rounded-xl p-6 bg-foreground/5 hover:bg-foreground/10 transition-colors"
                >
                  <h2 className="font-bold text-lg mb-3 text-primary">
                    {week.title}
                  </h2>
                  <ul className="space-y-2">
                    {week.tasks.map((task, key) => (
                      <li key={key} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}

              <button
                className="w-full py-3 px-6 rounded-lg bg-green-600 text-background font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                onClick={handleSave}
              >
                {loading ? "Saving Your Path..." : "Save"}
              </button>
            </div>
          ) : (
            <div className="border border-foreground/10 rounded-xl p-6 bg-foreground/5 hover:bg-foreground/10 transition-colors text-center">
              {" "}
              Generate Roadmap to see it here !{" "}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
