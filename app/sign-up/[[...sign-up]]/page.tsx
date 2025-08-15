"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Welcome to StudyFlow
          </h1>
          <p className="text-foreground/80">
            Create your account to get started
          </p>
        </div>

        <div className="bg-foreground/5 p-8 rounded-xl border border-foreground/10">
          <SignUp
            signInFallbackRedirectUrl="/create-profile"
            appearance={{
              variables: {
                colorPrimary: "hsl(var(--primary))",
                colorText: "hsl(var(--foreground))",
              },
              elements: {
                card: "shadow-none bg-transparent border-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formFieldInput:
                  "border-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary",
                formButtonPrimary:
                  "bg-primary hover:bg-secondary text-background",
                footerActionLink: "text-primary hover:text-secondary",
              },
            }}
          />
        </div>

        <p className="text-center text-foreground/70 text-sm">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-primary hover:text-secondary transition-colors"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
