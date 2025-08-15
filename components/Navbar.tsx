import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-background border-b border-foreground/10 py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-primary hover:text-secondary transition-colors"
        >
          StudyFlow
        </Link>

        <div className="flex items-center gap-6">
          {/* Signed In */}
          <SignedIn>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-foreground hover:text-primary transition-colors"
              >
                My Learning
              </Link>
              <Link
                href="/roadmap"
                className="text-foreground hover:text-primary transition-colors"
              >
                Generate Roadmap
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <SignOutButton>
                <button className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Sign Out
                </button>
              </SignOutButton>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          {/* Signed Out */}
          <SignedOut>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-foreground hover:text-primary transition-colors"
              >
                My Learning
              </Link>
              <Link
                href="/roadmap"
                className="text-foreground hover:text-primary transition-colors"
              >
                Generate Roadmap
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/sign-in"
                className="text-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-primary text-background px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
