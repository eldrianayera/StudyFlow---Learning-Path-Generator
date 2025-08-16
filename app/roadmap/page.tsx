"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TOAST_ID } from "@/lib/toast";

export type Week = { title: string; tasks: string[]; isCompleted: boolean };

export default function RoadMap() {
  const [topic, setTopic] = useState<string>("");
  const [level, setLevel] = useState<string>("beginner");
  const [duration, setDuration] = useState<number>(3);
  const [roadmap, setRoadmap] = useState<Week[] | null>(null);
  const [title, setTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

      toast.success("Learning Path generated !", { id: TOAST_ID });
      if (!res.ok) {
        console.error(data.error);
        setRoadmap([]);
      } else {
        const addedIsCompleted = data.roadmap.map((week: Week) => ({
          ...week,
          isCompleted: false,
        }));

        setRoadmap(addedIsCompleted);
      }
    } catch (err) {
      toast.error("Failed to generate learning path !", { id: TOAST_ID });

      console.error(err);
      setRoadmap([]);
    } finally {
      setLoading(false);
    }
  };

  function handleConfirm() {
    setIsModalOpen(true);
  }

  async function handleSave() {
    if (!title) {
      toast.error("Please Input Title");
      return;
    }
    try {
      const savingId = toast.loading("Saving...");

      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roadmap, title }),
      });

      const response = await res.json();
      const id = response.id;

      toast.success("Learning Path Saved !", { id: savingId });

      route.push(`/dashboard/${id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      return console.error("Fail to Save Roadmap");
    }
  }

  return (
    <div className="bg-gradient-to-b from-background/95 to-background/100 text-foreground min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Build Your Learning Path
          </h1>
          <p className="text-foreground/80">
            Create a personalized roadmap for your learning journey
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 rounded-xl border border-foreground/20 bg-white/5 shadow-sm"
        >
          <div className="space-y-2">
            <label className="font-medium">
              What would you like to master?
            </label>
            <input
              type="text"
              placeholder="Enter a topic (e.g., Advanced JavaScript, Data Science...)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 rounded-lg border border-foreground/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-medium">Current skill level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 rounded-lg border border-foreground/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Learning timeline</label>
              <div className="flex items-center gap-3">
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="flex-1 p-3 rounded-lg border border-foreground/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <span className="text-foreground/80">Months</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-primary text-background font-bold hover:bg-secondary transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating..." : "Generate Learning Path"}
          </button>
        </form>

        {/* Results Section */}
        <section className="space-y-6">
          {roadmap ? (
            <div className="space-y-4">
              <button
                className="w-full py-3 px-6 rounded-lg bg-green-600 text-background font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                onClick={handleConfirm}
              >
                {loading ? "Saving Your Path..." : "Save"}
              </button>
              {roadmap.map((week, index) => (
                <div
                  key={index}
                  className="border border-foreground/20 rounded-xl p-6 bg-white/10 hover:bg-white/20 hover:border-primary transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-primary">
                      Week {index + 1}
                    </h2>
                    {week.isCompleted && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-semibold">
                        Completed
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {week.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start">
                        <span className="text-secondary mr-2">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-foreground/20 rounded-xl p-8 text-center bg-white/10 shadow-sm">
              <p className="text-foreground/80">
                Your generated roadmap will appear here
              </p>
            </div>
          )}
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-foreground/80 z-50">
            <div className="bg-background p-6 rounded-xl border border-foreground/10 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold text-primary mb-4">
                Save Your Roadmap
              </h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Roadmap title"
                className="w-full p-3 mb-6 rounded-lg border border-foreground/20 bg-background focus:ring-2 focus:ring-primary"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-primary text-background hover:bg-secondary"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
