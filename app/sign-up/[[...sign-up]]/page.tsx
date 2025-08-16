"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-lg space-y-6">
        {" "}
        {/* wider than md */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Welcome to StudyFlow
          </h1>
          <p className="text-foreground/80">
            Create your account to get started
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full sm:w-[400px]">
            <SignUp
              signInFallbackRedirectUrl="/create-profile"
              appearance={{
                elements: {
                  card: "shadow-lg rounded-xl border border-foreground/10",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
