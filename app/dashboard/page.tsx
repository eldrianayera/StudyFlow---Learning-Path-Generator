"use client";

import { useEffect, useState } from "react";
import { Week } from "../roadmap/page";
import { toast } from "react-hot-toast";
import Link from "next/link";

export type roadmapInput = {
  title: string;
  roadmap: Week[];
  id: string;
  userClerkId: string;
};

export default function Dashboard() {
  const [roadmaps, setRoadmaps] = useState<roadmapInput[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const toastId = "loading-roadmaps";
    toast.loading("Loading your learning paths...", { id: toastId });

    async function fetchRoadmap() {
      try {
        const res = await fetch("/api/roadmap");
        const responseText = await res.json();
        console.log(responseText.data);
        if (responseText.data.length === 0) {
          toast(
            (t) => (
              <div className="flex-center flex-col gap-2">
                <p>You don't have any learning path ...</p>
                <a
                  href="/roadmap"
                  className="bg-primary text-background px-4 py-1 rounded-full"
                >
                  {" "}
                  Create Now !{" "}
                </a>
              </div>
            ),
            { id: toastId }
          );
          setRoadmaps(null);
          return;
        }
        console.log(responseText.data);

        setRoadmaps(responseText.data);

        toast.success("Roadmaps loaded!", { id: toastId });
      } catch (error) {
        toast.error("Failed to fetch roadmap", { id: toastId });
        console.error("Failed to fetch roadmap");
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmap();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Your Learning Paths
          </h1>

          {roadmaps ? (
            <div className="grid gap-6">
              {roadmaps.map((item) => (
                <a
                  href={`dashboard/${item.id}`}
                  key={item.id}
                  className="block group"
                >
                  <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6 transition-all hover:border-primary">
                    <h2 className="text-xl font-bold text-primary mb-4">
                      {item.title}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      {item.roadmap.map((week, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm  ${
                            week.isCompleted
                              ? "bg-green-600 text-background"
                              : "bg-foreground/10 text-foreground"
                          } `}
                        >
                          Week {index + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6 p-12 rounded-xl border-2 border-dashed border-foreground/20 bg-foreground/5 text-center hover:border-primary/30 transition-all duration-300">
              <a
                href="/roadmap"
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </a>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-foreground">
                  No learning paths yet
                </h3>
                <p className="text-foreground/60 max-w-md">
                  Get started by creating your first personalized learning
                  roadmap
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/roadmap"
                  className="px-6 py-3 rounded-lg bg-primary text-background font-medium hover:bg-secondary transition-colors shadow-sm hover:shadow-md"
                >
                  Create Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
