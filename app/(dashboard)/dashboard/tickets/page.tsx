import React from 'react';
import { IPageProps } from 'types/page';
import { TicketsList } from './tickets-list';
import { getTickets } from 'actions/ticket.action';

export const dynamic = 'force-dynamic';

export default async function page({ searchParams }: IPageProps) {
  const page = Number(searchParams.page ?? 1);
  const query = searchParams.query ?? undefined;
  const userId = searchParams.userId ?? undefined;
  const tickets = await getTickets(page, query, userId);

  return <TicketsList tickets={tickets ?? []} />;
}
