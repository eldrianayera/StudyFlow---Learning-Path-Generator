import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const roadmap = body.roadmap;
  console.log(roadmap);

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
