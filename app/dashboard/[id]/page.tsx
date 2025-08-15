"use client";

import { useParams } from "next/navigation";

export default function roadmapDetail() {
  const params = useParams();
  const id = params.id;
  return <div>{id}</div>;
}
