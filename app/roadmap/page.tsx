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
      const res = await fetch("/api/generate-roadmap", {
        method: "POST", // fixed typo
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }), // send as object
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        setResult([]);
      } else {
        setResult(data.roadmap); // extract roadmap array
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
