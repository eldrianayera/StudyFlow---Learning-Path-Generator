"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RoadmapInput } from "@/components/RoadmapCard";
import toast from "react-hot-toast";
import Link from "next/link";
import { TOAST_ID } from "@/lib/toast";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// Fetch roadmap by ID
async function fetchById(id: string): Promise<RoadmapInput> {
  const res = await fetch(`/api/roadmap/${id}`);
  if (!res.ok) throw new Error("Failed to fetch roadmap by ID");
  const response = await res.json();
  return response.data;
}

// Update task status
async function updateStatus({ id, index }: { id: string; index: number }) {
  const res = await fetch(`/api/roadmap/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ index }),
  });

  if (!res.ok) throw new Error("Failed to change Status");
}

// update task status UI
function optimisticToggle(
  { id, index }: { id: string; index: number },
  queryClient: QueryClient
) {
  queryClient.cancelQueries({ queryKey: ["roadmap", id] });

  const previousRoadmap = queryClient.getQueryData<RoadmapInput>([
    "roadmap",
    id,
  ]);

  if (previousRoadmap) {
    queryClient.setQueryData<RoadmapInput>(["roadmap", id], (old) => {
      if (!old) return old;
      const updatedRoadmap = [...old.roadmap];
      updatedRoadmap[index] = {
        ...updatedRoadmap[index],
        isCompleted: !updatedRoadmap[index].isCompleted,
      };
      return {
        ...old,
        roadmap: updatedRoadmap,
      };
    });
  }

  return { previousRoadmap };
}

// Component Function ////////////////////////////////////////////
export default function RoadmapDetail() {
  const params = useParams();
  const id = String(params.id);

  const queryClient = useQueryClient();

  // fetch mutation ////////////////////////////////////////////////////
  const {
    data: roadmap,
    isLoading: fetchLoading,
    isError: fetchError,
  } = useQuery({
    queryKey: ["roadmap", id],
    queryFn: () => fetchById(id),
    initialData: () => {
      const allRoadmaps = queryClient.getQueryData<RoadmapInput[]>(["roadmap"]);
      return allRoadmaps?.find((item) => item.id === id);
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    console.log("useEffect Trigerred");
    if (fetchLoading) {
      toast.loading("Loading Your Learning Path...", { id: TOAST_ID });
    } else if (fetchError) {
      toast.error("Failed to get learning path", { id: TOAST_ID });
    } else {
      toast.dismiss(TOAST_ID);
    }
  }, [fetchLoading]);

  // update task mutation ////////////////////////////////////////////////////

  const { mutate, isPending: updatePending } = useMutation({
    mutationFn: ({ id, index }: { id: string; index: number }) =>
      updateStatus({ id, index }),
    onMutate: ({ id, index }: { id: string; index: number }) =>
      optimisticToggle({ id, index }, queryClient),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["roadmap", id] }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roadmap"] }),
    onError: (err, variables, context) => {
      toast.error("Failed to update task status", { id: TOAST_ID });
      if (context?.previousRoadmap) {
        queryClient.setQueryData(["roadmap", id], context.previousRoadmap);
      }
    },
  });

  const handleClick = (index: number): void => {
    if (updatePending) return;
    mutate({ id, index });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-4 z-50 mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-background/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-foreground/10 text-primary hover:text-secondary transition-colors"
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
                  onClick={() => handleClick(index)}
                  key={index}
                  className="group relative overflow-hidden bg-background border border-foreground/10 rounded-xl p-6 transition-all hover:border-primary hover:shadow-lg hover:bg-secondary/10 cursor-pointer"
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
