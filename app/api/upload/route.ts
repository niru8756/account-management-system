import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { token, fileName, fileUrl, tags } = await req.json();

  const link = await prisma.uploadLink.findUnique({ where: { token } });

  if (!link || link.used || link.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });
  }

  const document = await prisma.document.create({
    data: { sellerId: link.sellerId, fileName, fileUrl, tags },
  });

  await prisma.uploadLink.update({
    where: { token },
    data: { used: true },
  });

  return NextResponse.json(document);
}
