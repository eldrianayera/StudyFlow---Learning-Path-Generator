import FloatingPlusIconButton from "@/components/FloatingPlusIconButton";
import RoadmapCard from "@/components/RoadmapCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-10">
          <h1 className="text-3xl font-bold mb-12">Your Learning Paths</h1>
          <FloatingPlusIconButton />
          <RoadmapCard />
        </div>
      </div>
    </div>
  );
}
