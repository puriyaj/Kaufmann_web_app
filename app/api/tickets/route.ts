import { Prisma } from '@prisma/client';
import { PAGE_SIZE } from '@utils/constants';
import { paginatedResponse } from '@utils/helper';
import { prisma } from '@utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const body = req.nextUrl.searchParams;
  const query = body.get('query') ?? undefined;
  const userId = body.get('userId') ?? undefined;
  const page = Number(body.get('page') ?? 1);
  const skip = (page - 1) * PAGE_SIZE;
  const where: Prisma.TicketWhereInput = {
    subject: { contains: query?.trim(), mode: 'insensitive' },
    userId: { equals: userId },
  };
  const [result, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      include: {
        user: { select: { id: true, name: true } },
      },
      orderBy: [{ createdAt: 'desc' }],
      take: PAGE_SIZE,
      skip,
    }),
    prisma.ticket.count({ where }),
  ]);

  return NextResponse.json(paginatedResponse(result, PAGE_SIZE, page, count));
}
