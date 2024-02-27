'use server';
import { API_URL, UNAUTORIZED_MESSAGE } from '@utils/constants';
import { GeneralError, ResponseEntity } from '@utils/genral-error';
import { validate } from '@utils/validator';
import { authOptions } from '@utils/auth';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { prisma } from '@utils/prisma';
import { makeUrl } from '@utils/utils';
import { Paginated } from 'types/page';
import { TicketWithUser } from 'types/types';
import { CACHE_TICKETS } from '@utils/cache-tags';
import { CreateTicket, DeleteTicket, UpdateTicketStatus } from 'requests/ticket.dto';
import { ACTIVATION_STATUS } from '../prisma/generated/client';

export const getTickets = async (page: number, query?: string, userId?: string): Promise<Paginated<TicketWithUser>> => {
  const url = makeUrl(`https://${process.env.VERCEL_URL}/api/tickets`, { page, query, userId });

  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, next: { tags: [CACHE_TICKETS] } });

  const result = await response.json();
  return result;
};

export async function createTicket(body: CreateTicket) {
  const session = await getServerSession(authOptions);
  await validate(body, CreateTicket);
  const { subject, message, email, name, phoneNumber } = body;
  const count = await prisma.ticket.count({
    where: {
      email: {
        equals: email,
      },
      status: ACTIVATION_STATUS.PENDING,
    },
  });
  if (count >= 3) throw new Error('نمیتوانید بیش از ۳ تیکت درحال بررسی داشته باشید');
  const userId = session ? session.user.id : undefined;
  const res = await prisma.ticket.create({ data: { userId, subject, email, name, phoneNumber, message, status: ACTIVATION_STATUS.PENDING } });
  revalidateTag(CACHE_TICKETS);
  return res;
}

export async function updateTicketStatus(body: UpdateTicketStatus) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);

  await validate(body, UpdateTicketStatus);
  const { status, id } = body;

  const res = await prisma.ticket.update({
    where: { id },
    data: { status },
  });
  revalidateTag(CACHE_TICKETS);
  return res;
}

export async function deleteTicket(body: DeleteTicket) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, DeleteTicket);
  const res = await prisma.ticket.delete({ where: { id: body.id, userId: session.user.id } });
  revalidateTag(CACHE_TICKETS);
  return res;
}
