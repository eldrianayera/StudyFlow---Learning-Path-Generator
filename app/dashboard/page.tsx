"use client";

import { useEffect, useState } from "react";
import { Week } from "../roadmap/page";

export type roadmapAndId = {
  roadmap: Week[];
  id: string;
};

export default function Dashboard() {
  const [roadmaps, setRoadmaps] = useState<roadmapAndId[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchRoadmap() {
      setLoading(true);
      try {
        const res = await fetch("/api/roadmap", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log(data.roadmap);
        console.log(data.roadmap.roadmap);

        setRoadmaps(data.roadmap);
        setLoading(false);
      } catch (error) {
        throw new Error("Failed to fetch roadmap");
      }
    }

    fetchRoadmap();
  }, []);

  if (loading)
    return (
      <div className="flex-center min-h-screen -translate-y-22">
        {" "}
        Loading Your Learning...{" "}
      </div>
    );

  return (
    <section className="max-w-5xl mx-auto flex flex-col gap-12 px-12">
      {roadmaps ? (
        roadmaps.map((item) => {
          return (
            <a href={`dashboard/${item.id}`} key={item.id}>
              <h2>{item.roadmap[0].title}</h2>
              <div>
                {item.roadmap[0].tasks.map((task, key) => {
                  return <li key={key}>{task}</li>;
                })}
              </div>
            </a>
          );
        })
      ) : (
        <div> Create Learning Path to see it here ! </div>
      )}
    </section>
  );
}
