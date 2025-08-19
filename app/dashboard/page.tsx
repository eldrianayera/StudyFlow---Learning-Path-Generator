"use client";

import { useEffect, useState } from "react";
import { Week } from "../roadmap/page";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { TOAST_ID } from "@/lib/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function formatDate(date: string | Date) {
  const d = dayjs(date);
  return `${d.fromNow()} • ${d.format("MMM D, YYYY h:mm A")}`;
}

export type RoadmapInput = {
  title: string;
  roadmap: Week[];
  id: string;
  userClerkId: string;
  createdAt: Date;
};

async function fetchRoadmap(): Promise<RoadmapInput[]> {
  const res = await fetch("/api/roadmap");
  if (!res.ok) throw new Error("Failed to fetch roadmap");
  const response = await res.json();

  return response.data;
}

async function deleteRoadmap(id: string) {
  const res = await fetch(`/api/roadmap/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "appication/json",
    },
  });

  if (!res.ok) throw new Error("Failed to delete a roadmap");

  const response = await res.json();

  return response;
}

export default function Dashboard() {
  const [confirmDelete, setConfirmDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const queryClient = useQueryClient();

  // Fetch Mutation
  const {
    data: roadmaps,
    isLoading: fetchLoading,
    isError: fetchError,
  } = useQuery<RoadmapInput[], Error>({
    queryKey: ["roadmap"],
    queryFn: fetchRoadmap,
    staleTime: Infinity,
  });

  // Delete Mutation
  const {
    mutate,
    isPending: deletePending,
    isError: deleteError,
  } = useMutation({
    mutationFn: (id: string) => deleteRoadmap(id),
    onSuccess: () => {
      toast.success(<b>Learnings path deleted.</b>, { id: TOAST_ID });
      setConfirmDelete(null);
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
    },
  });

  useEffect(() => {
    if (fetchLoading) {
      toast.loading("Loading your learning path...", { id: TOAST_ID });
    } else {
      if (fetchError)
        toast.error(<b>Failed to get your learning path.</b>, { id: TOAST_ID });
      else if (roadmaps) toast.dismiss(TOAST_ID);
    }
  }, [fetchLoading, fetchError, roadmaps]);

  useEffect(() => {
    if (deletePending) {
      toast.loading("Deleting learning path...", { id: TOAST_ID });
    } else {
      if (deleteError)
        toast.error(<b>Failed to get your learning path.</b>, { id: TOAST_ID });
    }
  }, [deletePending, deleteError]);

  async function handleDelete(id: string) {
    mutate(id);
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
              {/* Mobile Floating Action Button (only shows on mobile) */}
              <div className="md:hidden fixed bottom-6 right-6 z-40">
                <Link href="/roadmap" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    fill="var(--primary)"
                    stroke="var(--background)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-lg hover:opacity-90 transition-opacity"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                </Link>
              </div>

              {/* Regular Create Button (shows on desktop) */}
              <Link
                href="/roadmap"
                className="hidden md:block w-full text-background text-center bg-primary rounded-lg p-3 hover:bg-secondary transition-colors"
              >
                Create Learning Path
              </Link>
              {roadmaps.map((item) => (
                <div
                  key={item.id}
                  className="group relative hover:shadow-lg transition-all duration-200"
                >
                  <div className="bg-background border border-foreground/10 rounded-xl p-6 transition-all hover:border-primary h-full">
                    {/* Card Header */}
                    <div className="flex justify-between items-center mb-4 border-b border-foreground/10 pb-2">
                      {/* Left Section: Title + Date */}
                      <div className="flex flex-col">
                        <Link
                          href={`dashboard/${item.id}`}
                          className="text-lg font-semibold text-primary hover:text-secondary transition-colors"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setConfirmDelete({ id: item.id, title: item.title });
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                        aria-label="Delete roadmap"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
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

      {/* Modal  */}
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-foreground/80 backdrop-blur-sm">
          <div className="bg-background border border-foreground/10 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Delete Learning Path
              </h3>
            </div>

            <p className="text-foreground/80 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-primary">
                &quot;{confirmDelete.title}&quot;
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-5 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                className="px-5 py-2 rounded-lg bg-red-600 text-background hover:bg-red-400 transition-colors duration-300"
              >
                Delete Path
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
