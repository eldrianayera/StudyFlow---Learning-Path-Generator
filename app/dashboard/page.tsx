"use client";

import { useEffect, useState } from "react";
import { Week } from "../roadmap/page";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { TOAST_ID } from "@/lib/toast";

export type roadmapInput = {
  title: string;
  roadmap: Week[];
  id: string;
  userClerkId: string;
};

export default function Dashboard() {
  const [roadmaps, setRoadmaps] = useState<roadmapInput[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchRoadmap() {
    try {
      const res = await fetch("/api/roadmap");
      const responseText = await res.json();
      if (responseText.data.length === 0) {
        toast(
          (t) => (
            <div className="flex-center flex-col gap-2">
              <p>No learning path yet...</p>
              <a
                href="/roadmap"
                className="bg-primary text-background px-4 py-1 rounded-full"
              >
                {" "}
                Create Now !{" "}
              </a>
            </div>
          ),
          { id: TOAST_ID }
        );
        setRoadmaps(null);
        return;
      }

      setRoadmaps(responseText.data);

      toast.success("Roadmaps loaded!", { id: TOAST_ID });
    } catch (error) {
      toast.error("Failed to fetch roadmap", { id: TOAST_ID });
      console.error("Failed to fetch roadmap");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    toast.loading("Loading your learning paths...", { id: TOAST_ID });

    fetchRoadmap();
  }, []);

  async function handleDelete(id: string) {
    toast.loading("Deleting Roadmap ...", { id: TOAST_ID });

    try {
      await fetch(`/api/roadmap/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.loading("Learning Path Succesfully Deleted !", { id: TOAST_ID });

      fetchRoadmap();
    } catch (error: any) {
      console.error("Failed to delete learning path !", error.message);
    }
    console.log(id);
  }

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
                <div
                  key={item.id}
                  className="group relative hover:shadow-lg transition-all duration-200"
                >
                  <div className="bg-background border border-foreground/10 rounded-xl p-6 transition-all hover:border-primary h-full">
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-4">
                      <Link
                        href={`dashboard/${item.id}`}
                        className="text-xl font-bold text-primary hover:text-secondary transition-colors pr-4"
                      >
                        {item.title}
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(item.id);
                        }}
                        className="text-primary hover:text-red-600 transition-colors p-1"
                        aria-label="Delete roadmap"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Weeks Progress */}
                    <Link href={`dashboard/${item.id}`} className="block">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.roadmap.slice(0, 5).map((week, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              week.isCompleted
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-foreground/5 text-foreground/80 border border-foreground/10"
                            }`}
                          >
                            Week {index + 1}
                          </span>
                        ))}
                        {item.roadmap.length > 5 && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/5 text-foreground/60 border border-foreground/10">
                            +{item.roadmap.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{
                              width: `${
                                (item.roadmap.filter((w) => w.isCompleted)
                                  .length /
                                  item.roadmap.length) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-foreground/60 mt-1">
                          <span>
                            {item.roadmap.filter((w) => w.isCompleted).length}{" "}
                            of {item.roadmap.length} weeks completed
                          </span>
                          <span>
                            {Math.round(
                              (item.roadmap.filter((w) => w.isCompleted)
                                .length /
                                item.roadmap.length) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
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
