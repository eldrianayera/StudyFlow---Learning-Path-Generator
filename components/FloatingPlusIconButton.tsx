import Link from "next/link";

export default function FloatingPlusIconButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link href="/generate-roadmap" className="rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="var(--primary)"
          stroke="var(--background)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-lg hover:opacity-90 transition-opacity"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      </Link>
    </div>
  );
}
