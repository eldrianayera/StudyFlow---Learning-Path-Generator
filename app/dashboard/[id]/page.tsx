"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roadmapInput } from "../page";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RoadmapDetail() {
  const [roadmap, setRoadmap] = useState<roadmapInput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const id = String(params.id);
  const loadingToast = "loading-toast";

  async function fetchRoadmap(id: string) {
    toast.loading("Loading your learning path...", { id: loadingToast });
    setLoading(true);
    try {
      const res = await fetch(`/api/roadmap/${id}`);
      const responseText = await res.json();
      toast.dismiss(loadingToast);
      setRoadmap(responseText.data);
    } catch (error) {
      toast.error("Learning path ready !", { id: loadingToast });
      console.error("Failed to fetch learning path");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRoadmap(id);
  }, [id]);

  async function handleClick(index: number) {
    toast.loading("Changing Task Status...", { id: loadingToast });
    try {
      await fetch(`/api/roadmap/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index }),
      });

      fetchRoadmap(id);
      toast.success("Task Status Changed !", { id: loadingToast });
    } catch (error: unknown) {
      toast.error("Task Status Change Failed !", { id: loadingToast });
      if (error instanceof Error) {
        console.error(error.message);
      }
      console.error('"Task Status Change Failed  : Unknown error');
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-foreground text-lg">
          Loading roadmap...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
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

        {roadmap ? (
          <section className="space-y-8">
            <h1 className="text-4xl font-bold text-foreground text-center mb-6">
              {roadmap.title}
            </h1>

            <div className="space-y-8">
              {roadmap.roadmap.map((week, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(index)}
                  className="group relative overflow-hidden bg-background border border-foreground/10 rounded-xl p-6 transition-all hover:border-primary hover:shadow-lg cursor-pointer"
                >
                  {/* Week header with status indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Badge */}
                      <div className="bg-primary text-background rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>

                      {/* Title */}
                      <h2
                        className="text-xl font-bold text-primary mr-5"
                        title={week.title}
                      >
                        {week.title}
                      </h2>
                    </div>

                    {/* Status Badge */}
                    {week.isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/50 text-primary flex-shrink-0">
                        ✔ Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-foreground/10 text-foreground/80 flex-shrink-0">
                        🕒 In Progress
                      </span>
                    )}
                  </div>

                  {/* Tasks list */}
                  <ul className="space-y-3">
                    {week.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="flex items-start before:content-[''] before:block before:w-1.5 before:h-1.5 before:rounded-full before:bg-secondary before:mt-2 before:mr-3"
                      >
                        <span className="text-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-12">
            <div className="text-foreground mb-4">No roadmap found</div>
            <Link
              href="/dashboard"
              className="text-primary hover:text-secondary transition-colors"
            >
              Generate a new roadmap
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
