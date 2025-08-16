import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // User is not created on Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json(
        { error: "Clerk User Not Found" },
        { status: 404 }
      );
    }

    // User's email is not created on Clerk
    const email = clerkUser?.emailAddresses[0].emailAddress;
    if (!email) {
      return NextResponse.json(
        { error: "Clerk User Email Not Found" },
        { status: 404 }
      );
    }

    // User already created on db
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Clerk User already exist !" },
        { status: 202 }
      );
    }

    // Create new user on db
    await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: email,
      },
    });

    return NextResponse.json(
      { message: "User successfully created !" },
      { status: 201 }
    );

    //
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
