"use client";

import { Week } from "@/app/roadmap/page";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function roadmapDetail() {
  const [roadmap, setRoadmap] = useState<Week[] | null>(null);

  const params = useParams();
  const id = String(params.id);

  useEffect(() => {
    async function fetchRoadmap(id: string) {
      try {
        const res = await fetch(`/api/roadmap/${id}`, {
          headers: {
            "Content-type": "application/json",
          },
        });

        const responseText = await res.json();
        console.log(responseText.data.roadMap);
        setRoadmap(responseText.data.roadMap);
      } catch (error) {
        console.log("Failed to fetch roadmap");
      }
    }

    fetchRoadmap(id);
  }, []);
  return (
    <div>
      {" "}
      <section>
        <a
          href="/dashboard"
          className="py-3 px-6 rounded-lg bg-green-600 text-background font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {" "}
          Back{" "}
        </a>
        {roadmap ? (
          <div className="grid gap-6">
            {roadmap.map((week, key) => (
              <article
                key={key}
                className="border border-foreground/10 rounded-xl p-6 bg-foreground/5 hover:bg-foreground/10 transition-colors"
              >
                <h2 className="font-bold text-lg mb-3 text-primary">
                  {week.title}
                </h2>
                <ul className="space-y-2">
                  {week.tasks.map((task, key) => (
                    <li key={key} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-foreground/10 rounded-xl p-6 bg-foreground/5 hover:bg-foreground/10 transition-colors text-center">
            {" "}
            Generate Roadmap to see it here !{" "}
          </div>
        )}
      </section>
    </div>
  );
}
