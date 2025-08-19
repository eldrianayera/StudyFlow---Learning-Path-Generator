import Link from "next/link";
import { RoadmapInput } from "./DashboardComponents";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

interface Props {
  roadmaps: RoadmapInput[];
  onDelete: (id: string, title: string) => void;
}

dayjs.extend(relativeTime);

function formatDate(date: string | Date) {
  const d = dayjs(date);
  return `${d.fromNow()} • ${d.format("MMM D, YYYY h:mm A")}`;
}

export default function RoadmapCard({ roadmaps, onDelete }: Props) {
  return (
    <div className="grid gap-6 mt-12">
      {roadmaps?.map((item) => (
        <div
          key={item.id}
          className="group relative hover:shadow-lg transition-all duration-200"
        >
          <div className="bg-background border border-foreground/10 rounded-xl p-6 transition-all hover:border-primary h-full">
            {/* Card Header */}
            <Link
              href={`dashboard/${item.id}`}
              className="flex justify-between items-center mb-4 border-b border-foreground/10 pb-2"
            >
              {/* Left Section: Title + Date */}
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-primary hover:text-secondary transition-colors">
                  {item.title}
                </div>
                <p className="text-xs text-muted-foreground">
                  started {formatDate(item.createdAt)}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(item.id, item.title);
                }}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                aria-label="Delete roadmap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </Link>

            {/* Weeks Progress */}
            <Link href={`dashboard/${item.id}`} className="block">
              <div className="flex flex-wrap gap-2 mb-2">
                {item.roadmap.slice(0, 5).map((week, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      week.isCompleted
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-foreground/5 text-foreground/80 border border-foreground/10"
                    }`}
                  >
                    Week {index + 1}
                  </span>
                ))}
                {item.roadmap.length > 5 && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/5 text-foreground/60 border border-foreground/10">
                    +{item.roadmap.length - 5} more
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${
                        (item.roadmap.filter((w) => w.isCompleted).length /
                          item.roadmap.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-foreground/60 mt-1">
                  <span>
                    {item.roadmap.filter((w) => w.isCompleted).length} of{" "}
                    {item.roadmap.length} weeks completed
                  </span>
                  <span>
                    {Math.round(
                      (item.roadmap.filter((w) => w.isCompleted).length /
                        item.roadmap.length) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
