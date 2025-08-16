"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TOAST_ID } from "@/lib/toast";

type ApiResponse = {
  message: string;
  error?: string;
};

async function createProfileRequest() {
  const res = await fetch("api/create-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data as ApiResponse;
}

export default function CreateProfile() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const { mutate, isPending } = useMutation<ApiResponse>({
    mutationFn: createProfileRequest,
    onSuccess: () => {
      toast.success("Welcome Back In !", { id: TOAST_ID });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error("Failed to sign up , please try again !", { id: TOAST_ID });
      console.log("Failed to sign up");
      router.push("/sign-up");
    },
  });

  useEffect(() => {
    if (isLoaded && isSignedIn && !isPending) {
      toast.loading("Creating your profile...", { id: TOAST_ID });
      mutate();
    }
  }, [isLoaded, isSignedIn]);

  return <div></div>;
}
