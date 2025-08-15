"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roadmapInput } from "../page";
import toast from "react-hot-toast";

export default function RoadmapDetail() {
  const [roadmap, setRoadmap] = useState<roadmapInput | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const id = String(params.id);

  useEffect(() => {
    const loadingToast = "loading-toast";
    toast.loading("Loading your learning path...", { id: loadingToast });

    async function fetchRoadmap(id: string) {
      setLoading(true);
      try {
        const res = await fetch(`/api/roadmap/${id}`);
        const responseText = await res.json();
        setRoadmap(responseText.data);
        toast.success("Learning path ready !", { id: loadingToast });
      } catch (error) {
        toast.error("Learning path ready !", { id: loadingToast });
        console.error("Failed to fetch learning path");
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmap(id);
  }, [id]);

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
          <a
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
          </a>
        </div>

        {roadmap ? (
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-foreground text-center mb-6">
              {roadmap.title}
            </h1>

            <div className="space-y-6">
              {roadmap.roadmap.map((week, index) => (
                <div
                  key={index}
                  className="bg-foreground/5 border border-foreground/10 rounded-xl p-6 transition-all hover:border-primary"
                >
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="bg-primary text-background rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    {week.title}
                  </h2>

                  <ul className="space-y-3 pl-2">
                    {week.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="flex items-start text-foreground"
                      >
                        <span className="text-secondary mr-3 mt-1">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-foreground mb-4">No roadmap found</div>
            <a
              href="/dashboard"
              className="text-primary hover:text-secondary transition-colors"
            >
              Generate a new roadmap
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
