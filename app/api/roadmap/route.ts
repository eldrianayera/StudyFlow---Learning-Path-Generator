import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { log } from "console";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not found in Clerk" },
      { status: 404 }
    );
  }
  try {
    const createdRoadmap = await prisma.roadmap.create({
      data: {
        userClerkId: user.id,
        roadmap: body.roadmap,
        title: body.title,
      },
    });
    return NextResponse.json(
      { message: "roadmap save succesfully", id: createdRoadmap.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save roadmap" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not found in Clerk" },
      { status: 404 }
    );
  }
  try {
    const data = await prisma.roadmap.findMany({
      where: { userClerkId: user.id },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
