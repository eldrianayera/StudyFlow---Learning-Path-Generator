"use client";

import { useState } from "react";

type Week = { title: string; tasks: string[] };

export default function RoadMap() {
  const [topic, setTopic] = useState<string>("");
  const [level, setLevel] = useState<string>("beginner");
  const [duration, setDuration] = useState<number>(3);
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
      const res = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level, duration }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        setResult([]);
      } else {
        setResult(data.roadmap);
      }
    } catch (err) {
      console.error(err);
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Generate Your Learning Roadmap
      </h1>

      <form onSubmit={handleSubmit} className="flex-center flex-col gap-3 mb-6">
        <label htmlFor="topic"> What do you want to learn ? </label>
        <input
          type="text"
          placeholder="Topic (e.g. React, Machine Learning...)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 rounded w-full"
          aria-label="Topic"
        />
        <label htmlFor="level"> Select your expertise !</label>
        <div>
          {" "}
          <select
            name="level"
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <label htmlFor="duration"> How long do you plan to learn ? </label>
        <div>
          {" "}
          <input
            type="range"
            min={1}
            max={12}
            value={duration}
            step={1}
            name="duration"
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <span> {duration} </span>
          <span> Months </span>
        </div>

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
            {result.map((week, key) => (
              <article key={key} className="border rounded p-4 shadow-sm">
                <h2 className="font-medium mb-2">{week.title}</h2>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {week.tasks.map((task, key) => (
                    <li key={key} className="mb-1">
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
