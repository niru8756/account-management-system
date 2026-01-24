import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const link = await prisma.uploadLink.create({
    data: { sellerId: id, token, expiresAt },
  });

  return NextResponse.json({ token: link.token, expiresAt: link.expiresAt });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const links = await prisma.uploadLink.findMany({
    where: { sellerId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(links);
}
