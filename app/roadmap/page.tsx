"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { ToastBar } from "react-hot-toast";
import { TOAST_ID } from "@/lib/toast";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type Week = { title: string; tasks: string[]; isCompleted: boolean };

type UserForm = {
  topic?: string;
  level?: string;
  duration?: string;
};

// Generate Roadmap
async function generateRoadmap(userForm: UserForm): Promise<Week[]> {
  // Post method to api/generate-roadmap
  const res = await fetch("/api/generate-roadmap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm),
  });

  if (!res.ok) throw new Error("Failed to generate Roadmap");

  const response = await res.json();
  console.log(response);

  // Add is Completed
  const addedIsCompleted = response.roadmap.map((week: Week) => ({
    ...week,
    isCompleted: false,
  }));

  return addedIsCompleted;
}

// Saving Roadmap
async function saveRoadmap({
  roadmap,
  title,
}: {
  roadmap: Week[];
  title: string;
}): Promise<string> {
  const res = await fetch("api/roadmap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roadmap, title }),
  });

  if (!res.ok) throw new Error("Failed to Save roadmap !");

  const response = await res.json();
  const id = response.id;

  return id;
}

export default function RoadMap() {
  const [userForm, setUserForm] = useState<UserForm>({
    topic: "",
    level: "Beginner",
    duration: "3",
  });

  const titleRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const route = useRouter();

  const queryClient = useQueryClient();

  // generate roadmap mutation
  const {
    mutate: generateMutate,
    isPending: generatePending,
    data: roadmap,
  } = useMutation<Week[], unknown, UserForm>({
    mutationFn: (userForm: UserForm) => generateRoadmap(userForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
    },
    onError: () => toast.error("Failed to generate roadmap"),
  });

  // saving roadmap mutation
  const { mutate: saveMutate, isPending: savePending } = useMutation<
    string,
    unknown,
    { roadmap: Week[]; title: string }
  >({
    mutationFn: ({ roadmap, title }: { roadmap: Week[]; title: string }) =>
      saveRoadmap({ roadmap, title }),
    onSuccess: (id) => {
      setIsModalOpen(false);
      if (titleRef.current) titleRef.current.value = "";
      route.push(`/dashboard/${id}`);
    },
    onError: () => toast.error("Failed to save roadmap"),
  });

  // handle submit generate roadmap
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    generateMutate(userForm);
  };

  function handleConfirm() {
    setIsModalOpen(true);
  }

  // handle save roadmap
  async function handleSave() {
    const title = titleRef.current?.value;

    if (!title) {
      toast.error("Please Input Title");
      return;
    }

    if (!roadmap) {
      toast.error("No roadmap to save!");
      return;
    }
    saveMutate({ roadmap, title });
  }

  return (
    <div className="bg-gradient-to-b from-background/95 to-background/100 text-foreground min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Dashboard
          </Link>
        </div>
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
              value={userForm!.topic}
              onChange={(e) =>
                setUserForm((prev) => ({
                  ...prev,
                  topic: e.target.value,
                }))
              }
              className="w-full p-3 rounded-lg border border-foreground/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-medium">Current skill level</label>
              <select
                value={userForm!.level}
                onChange={(e) =>
                  setUserForm((prev) => ({
                    ...prev,
                    level: e.target.value,
                  }))
                }
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
                  value={userForm!.duration}
                  onChange={(e) =>
                    setUserForm((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  className="flex-1 p-3 rounded-lg border border-foreground/20 bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {["1", "2", "3", "4", "5", "6"].map((num) => (
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
            disabled={generatePending}
          >
            {generatePending ? "Creating..." : "Generate Learning Path"}
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
                {savePending ? "Saving Your Path..." : "Save"}
              </button>
              {roadmap.map((week, index) => (
                <div
                  key={index}
                  className="border border-foreground/20 rounded-xl p-6 bg-white/10 hover:bg-white/20 hover:border-primary transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-primary">
                      {week.title}
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
                ref={titleRef}
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
                  disabled={savePending}
                >
                  {savePending ? "Saving..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
