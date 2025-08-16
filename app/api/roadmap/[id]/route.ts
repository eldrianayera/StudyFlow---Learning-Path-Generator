import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Week } from "@/app/roadmap/page";
import { Prisma } from "@prisma/client";

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
    console.log("error");

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
  const body = await req.json();
  const { index } = body;
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Id is required" });
  }

  try {
    const current = await prisma.roadmap.findUnique({
      where: { id },
    });

    if (!current) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
    }

    if (!Array.isArray(current.roadmap)) {
      return NextResponse.json(
        { error: "Roadmap field is not an array" },
        { status: 400 }
      );
    }
    if (!current.roadmap || !Array.isArray(current.roadmap)) {
      return NextResponse.json(
        { error: "Roadmap is not available" },
        { status: 400 }
      );
    }

    type RoadmapItem = { title: string; tasks: Week[]; isCompleted: boolean };
    const currentRoadmap = current.roadmap as RoadmapItem[]; // type assertion

    currentRoadmap[index] = {
      ...currentRoadmap[index], // spread the object at index
      isCompleted: !currentRoadmap[index].isCompleted, // toggle
    };

    try {
      await prisma.roadmap.update({
        where: { id },
        data: { roadmap: currentRoadmap },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: `Failed to change task status: ${error.message}` },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: "Failed to change task status: Unknown error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Updated Task Status Success" });
  } catch (error) {
    console.log("error");

    return NextResponse.json({ error: `Internal Error ` }, { status: 500 });
  }
}
