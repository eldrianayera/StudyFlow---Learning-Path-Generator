import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex-evenly">
      <Link href="/">
        <div>StudyFlow</div>
      </Link>

      {/* Signed In */}
      <SignedIn>
        <UserButton />
        <SignOutButton> Sign Out </SignOutButton>
      </SignedIn>

      {/* Signed Out */}

      <SignedOut>
        <Link href="/sign-up">
          <button> Sign Up </button>
        </Link>
      </SignedOut>
    </div>
  );
}
