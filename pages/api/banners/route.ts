import { prisma } from "@utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const result = await prisma.banner.findMany();
  return NextResponse.json(result);
}
