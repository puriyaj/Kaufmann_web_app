'use server';
import { API_URL, UNAUTORIZED_MESSAGE } from '@utils/constants';
import { GeneralError, ResponseEntity } from '@utils/genral-error';
import { validate } from '@utils/validator';
import { authOptions } from '@utils/auth';
import { getServerSession } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';
import { prisma } from '@utils/prisma';
import { makeUrl } from '@utils/utils';
import { Paginated } from 'types/page';
import { CommentWithProduct } from 'types/types';
import { CACHE_COMMENTS } from '@utils/cache-tags';
import { CreateComment, DeleteComment, UpdateComment, UpdateCommentStatus } from 'requests/comment.dto';
import { ACTIVATION_STATUS } from '../prisma/generated/client';

export const getComments = async (page: number, query?: string, productId?: string): Promise<Paginated<CommentWithProduct>> => {
  const url = makeUrl(`${API_URL}/comments`, { page, query, productId });

  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, next: { tags: [CACHE_COMMENTS] } });

  const result = await response.json();
  return result;
};

export async function createComment(body: CreateComment) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, CreateComment);
  const { name, message, productId, email, stars } = body;
  const count = await prisma.comment.count({
    where: {
      name: {
        equals: name,
      },
      status: ACTIVATION_STATUS.PENDING,
    },
  });
  if (count >= 3) throw new Error('نمیتوانید بیش از ۳ نظر درحال بررسی داشته باشید');

  const res = await prisma.comment.create({ data: { userId: session.user.id, name, message, productId, email, stars } });
  revalidateTag(CACHE_COMMENTS);
  return res;
}

export async function updateCommentStatus(body: UpdateCommentStatus) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);

  await validate(body, UpdateCommentStatus);
  const { status } = body;

  const res = await prisma.comment.update({
    where: { id: body.id },
    data: { status },
  });
  revalidateTag(CACHE_COMMENTS);
  if (status == ACTIVATION_STATUS.ACCEPTED) revalidatePath(`/products/${res.productId}`);
  return res;
}

export async function deleteComment(body: DeleteComment) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);

  await validate(body, DeleteComment);
  const res = await prisma.comment.delete({ where: { id: body.id, userId: session.user.id } });
  revalidateTag(CACHE_COMMENTS);
  return res;
}
