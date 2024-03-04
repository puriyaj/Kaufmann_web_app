'use server'
import { Prisma } from '@prisma/client';
import { PAGE_SIZE } from '@utils/constants';
import { paginatedResponse } from '@utils/helper';
import { prisma } from '@utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const body = req.nextUrl.searchParams;
  const query = body.get('query') ?? undefined;
  const isMain = body.get('isMain') ?? undefined;
  const page = Number(body.get('page') ?? 1);
  const skip = (page - 1) * PAGE_SIZE;
  const where: Prisma.CategoryWhereInput = {
    name: { contains: query?.trim(), mode: 'insensitive' },
  };
  const [result, count] = await prisma.$transaction([
    prisma.category.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
      take: PAGE_SIZE,
      skip,
      include: { subCategories: { select: { id: true, name: true } } },
    }),
    prisma.category.count({ where }),
  ]);

  return NextResponse.json(paginatedResponse(result, PAGE_SIZE, page, count));
}
