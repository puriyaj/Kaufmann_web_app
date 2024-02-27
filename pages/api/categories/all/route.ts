import { prisma } from '@utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const result = await prisma.category.findMany({
    orderBy: [{ createdAt: 'desc' }],
    include: { subCategories: { select: { id: true, name: true } } },
  });

  return NextResponse.json(result);
}
