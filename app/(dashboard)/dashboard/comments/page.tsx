import React from 'react';
import { CommentsList } from './comments-list';
import { IPageProps } from 'types/page';
import { getComments } from 'actions/comment.action';

export const dynamic = 'force-dynamic';

export default async function page({ searchParams }: IPageProps) {
  const page = Number(searchParams.page ?? 1);
  const query = searchParams.query ?? undefined;
  const productId = searchParams.productId ?? undefined;
  const comments = await getComments(page, query, productId);

  return <CommentsList comments={comments ?? []} />;
}
