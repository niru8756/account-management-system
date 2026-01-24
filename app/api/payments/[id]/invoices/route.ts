import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const invoiceNumber = `INV-${Date.now()}`;
  
  const invoice = await prisma.invoice.create({
    data: {
      paymentId: id,
      invoiceNumber,
      pdfUrl: `/invoices/${invoiceNumber}.pdf`,
    },
  });

  return NextResponse.json(invoice);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const invoices = await prisma.invoice.findMany({
    where: { paymentId: id },
  });
  return NextResponse.json(invoices);
}
