import Link from "next/link";

export default function CreateRoadmap() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-12 rounded-xl border-2 border-dashed border-foreground/20 bg-foreground/5 text-center hover:border-primary/30 transition-all duration-300">
      <a
        href="/roadmap"
        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </a>

      <div className="space-y-2">
        <h3 className="text-xl font-medium text-foreground">
          No learning paths yet
        </h3>
        <p className="text-foreground/60 max-w-md">
          Get started by creating your first personalized learning roadmap
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/roadmap"
          className="px-6 py-3 rounded-lg bg-primary text-background font-medium hover:bg-secondary transition-colors shadow-sm hover:shadow-md"
        >
          Create Now
        </Link>
      </div>
    </div>
  );
}
