import Link from "next/link";

export default function BackToButton() {
  return (
    <div className="sticky top-4 z-50 mb-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 bg-background/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-foreground/10 text-primary hover:text-secondary transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Dashboard
      </Link>
    </div>
  );
}
