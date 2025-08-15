import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { log } from "console";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

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
        roadmap: body.roadmap,
        title: body.title,
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

    console.log(data);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch roadmap" },
      { status: 500 }
    );
  }
}
