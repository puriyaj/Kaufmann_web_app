import { Prisma } from '../../../prisma/generated/client';
import { PAGE_SIZE } from '@utils/constants';
import { paginatedResponse } from '@utils/helper';
import { prisma } from '@utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const body = req.nextUrl.searchParams;
  const query = body.get('query') ?? undefined;
  const productId = body.get('productId') ?? undefined;
  const page = Number(body.get('page') ?? 1);
  const skip = (page - 1) * PAGE_SIZE;
  const where: Prisma.CommentWhereInput = {
    message: { contains: query?.trim(), mode: 'insensitive' },
    productId: { equals: productId },
  };
  const [result, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      include: {
        product: { select: { id: true, name: true } },
      },
      orderBy: [{ createdAt: 'desc' }],
      take: PAGE_SIZE,
      skip,
    }),
    prisma.comment.count({ where }),
  ]);

  return NextResponse.json(paginatedResponse(result, PAGE_SIZE, page, count));
}
