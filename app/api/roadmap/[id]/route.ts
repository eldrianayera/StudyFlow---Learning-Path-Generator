import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Week } from "@/app/generate-roadmap/page";
import { Prisma } from "@prisma/client";

type RoadmapItem = { title: string; tasks: Week[]; isCompleted: boolean };

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Id is required" });
  }

  try {
    const data = await prisma.roadmap.findUnique({
      where: { id },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: `Internal Error ` }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Id is required" });
  }

  try {
    await prisma.roadmap.delete({
      where: { id },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to change task status: ${error.message}` },
        { status: 500 }
      );
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma knows the error code
      console.log("Error code:", error.code); // e.g., "P2025" for record not found
      console.log("Meta:", error.meta); // extra info like target ID
      console.log("Message:", error.message); // human-readable message
    }

    return NextResponse.json(
      { error: "Failed to change task status: Unknown error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Learning Path has been deleted" },
    { status: 200 }
  );
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { index } = await req.json();

    // Combined prisma transaction
    const updated = await prisma.$transaction(async (tx) => {
      const current = await tx.roadmap.findUnique({ where: { id } });
      if (!current) throw new Error("Roadmap not found");

      const roadmap = current.roadmap as RoadmapItem[];
      if (!Array.isArray(roadmap)) throw new Error("Invalid roadmap structure");

      // Toggle completion status
      roadmap[index].isCompleted = !roadmap[index].isCompleted;

      return tx.roadmap.update({
        where: { id },
        data: { roadmap },
      });
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to toggle task status` },
      { status: 500 }
    );
  }
}
