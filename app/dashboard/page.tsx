import FloatingPlusIconButton from "@/components/FloatingPlusIconButton";
import DashboardComponents from "@/components/DashboardComponents";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-10">
          <h1 className="text-3xl font-bold">Your Learning Paths</h1>
          <FloatingPlusIconButton />
          <DashboardComponents />
        </div>
      </div>
    </div>
  );
}
