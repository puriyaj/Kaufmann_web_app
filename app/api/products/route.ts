import { Prisma } from '../../../prisma/generated/client';
import { PAGE_SIZE } from '@utils/constants';
import { paginatedResponse } from '@utils/helper';
import { prisma } from '@utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const body = req.nextUrl.searchParams;
  const query = body.get('query') ?? undefined;
  const subCategoryId = body.get('subCategoryId') ?? undefined;
  const page = Number(body.get('page') ?? 1);
  const skip = (page - 1) * PAGE_SIZE;
  const where: Prisma.ProductWhereInput = {
    name: { contains: query?.trim(), mode: 'insensitive' },
    subCategoryId: { equals: subCategoryId },
  };
  const [result, count] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      include: {
        subCategory: { select: { id: true, name: true } },
        stocks: { select: { id: true, productId: true, price: true, inStock: true, currency: true, discount: true }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: [{ createdAt: 'desc' }],
      take: PAGE_SIZE,
      skip,
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json(paginatedResponse(result, PAGE_SIZE, page, count));
}
