import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
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
