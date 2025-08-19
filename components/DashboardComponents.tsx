"use client";

import { useEffect, useState } from "react";
import { Week } from "@/app/roadmap/page";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { TOAST_ID } from "@/lib/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteModal from "./DeleteModal";
import CreateRoadmap from "./CreateRoadmap";
import ChangeOrderButton from "./ChangeOrderButton";
import RoadmapCard from "./RoadmapCard";

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

// Component function ///////////////////////////////////////////////////////////////////////
export default function DashboardComponents() {
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

  // createdAt order change
  const handleOrderChange = () => {
    queryClient.setQueryData<RoadmapInput[]>(["roadmap"], (old) => {
      if (!old) return old;
      return [...old].reverse();
    });
  };

  return (
    <div className="relative pt-1">
      {/* Change order button */}
      {roadmaps && roadmaps.length > 0 && (
        <ChangeOrderButton onClick={handleOrderChange} />
      )}

      {/* MainCard */}
      {roadmaps && roadmaps.length !== 0 ? (
        <RoadmapCard
          roadmaps={roadmaps}
          onDelete={(id, title) => setConfirmDelete({ id, title })}
        />
      ) : (
        <CreateRoadmap />
      )}

      {/* Modal  */}
      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <DeleteModal
          title={confirmDelete.title}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete.id)}
        />
      )}

      {/*  */}
    </div>
  );
}
