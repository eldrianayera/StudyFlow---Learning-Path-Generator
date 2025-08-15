import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const roadmap = body.roadmap;

  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "User not found in Clerk" },
      { status: 404 }
    );
  }
  try {
    await prisma.roadmap.create({
      data: {
        userClerkId: user.id,
        roadMap: roadmap,
      },
    });
    return NextResponse.json(
      { message: "roadmap save succesfully" },
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

    const roadmap = data.map((item) => ({
      roadmap: item.roadMap,
      id: item.id,
    }));

    return NextResponse.json({ roadmap });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch roadmap" },
      { status: 500 }
    );
  }
}
