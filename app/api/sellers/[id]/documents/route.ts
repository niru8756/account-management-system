import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const documents = await prisma.document.findMany({ where: { sellerId: id } });
  return NextResponse.json(documents);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { fileName, fileUrl, tags } = await req.json();
  const document = await prisma.document.create({
    data: { sellerId: id, fileName, fileUrl, tags },
  });
  return NextResponse.json(document);
}
