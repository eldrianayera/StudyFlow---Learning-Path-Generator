"use client";

import { useEffect, useState } from "react";
import { Week } from "../roadmap/page";
import { Toaster, toast } from "react-hot-toast";

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
    async function fetchRoadmap() {
      try {
        const res = await fetch("/api/roadmap");
        const responseText = await res.json();
        setRoadmaps(responseText.data);
      } catch (error) {
        console.error("Failed to fetch roadmap");
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmap();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-foreground text-lg">
          Loading your roadmaps...
        </div>
      </div>
    );

  return (
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
                    {item.roadmap.slice(0, 4).map((week, index) => (
                      <span
                        key={index}
                        className="bg-foreground/10 text-foreground px-3 py-1 rounded-full text-sm"
                      >
                        Week {index + 1}
                      </span>
                    ))}
                    {item.roadmap.length > 4 && (
                      <span className="bg-foreground/10 text-foreground px-3 py-1 rounded-full text-sm">
                        +{item.roadmap.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-foreground/10 rounded-xl bg-foreground/5">
            <div className="text-foreground mb-4">No learning paths found</div>
            <a
              href="/roadmap"
              className="text-primary hover:text-secondary transition-colors"
            >
              Create your first learning path
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
