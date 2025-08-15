import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex-evenly mb-16">
      <Link href="/">
        <div>StudyFlow</div>
      </Link>

      {/* Signed In */}
      <SignedIn>
        <UserButton />
        <Link href="/dashboard"> My Learning </Link>
        <Link href="/roadmap"> Generate Roadmap </Link>
        <SignOutButton> Sign Out </SignOutButton>
      </SignedIn>

      {/* Signed Out */}

      <SignedOut>
        <Link href="/sign-up">
          <button> Sign Up </button>
        </Link>
        <Link href="/sign-up"> My Learning </Link>
        <Link href="/sign-up"> Generate Roadmap </Link>
      </SignedOut>
    </div>
  );
}
