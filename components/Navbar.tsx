import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-primary/60 border-b border-background/10 py-4 px-6 z-60 ">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-purple-950 hover:text-background transition-colors"
        >
          StudyFlow
        </Link>

        <div className="flex items-center gap-6">
          {/* Signed In */}
          <SignedIn>
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-background hover:text-foreground transition-colors"
              >
                My Learning
              </Link>
              <Link
                href="/roadmap"
                className="max-md:hidden text-background hover:text-foreground transition-colors"
              >
                Generate Roadmap
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="max-md:hidden">
                <SignOutButton>
                  <button className="text-background/70 hover:text-foreground transition-colors text-sm">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>

              <UserButton />
            </div>
          </SignedIn>

          {/* Signed Out */}
          <SignedOut>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-background hover:text-foreground transition-colors"
              >
                My Learning
              </Link>
              <Link
                href="/roadmap"
                className="text-background hover:text-foreground transition-colors"
              >
                Generate Roadmap
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/sign-up"
                className="bg-purple-950 text-background px-4 py-2 rounded-md hover:bg-secondary transition-colors"
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
