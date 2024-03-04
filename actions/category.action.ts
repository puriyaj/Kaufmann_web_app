'use server';
import { CACHE_CATEGORIES } from '@utils/cache-tags';
import { API_URL, UNAUTORIZED_MESSAGE } from '@utils/constants';
import { GeneralError, ResponseEntity } from '@utils/genral-error';
import { validate } from '@utils/validator';
import { authOptions } from '@utils/auth';
import { getServerSession } from 'next-auth';
import { CreateCategory, DeleteCategory, UpdateCategory } from 'requests/category.dto';
import { revalidateTag } from 'next/cache';
import { prisma } from '@utils/prisma';
import { Paginated } from 'types/page';
import { makeUrl } from '@utils/utils';
import { CategoryWithChildrens } from 'types/types';
import { Category } from '@prisma/client';
import useSWR from 'swr'
export const getCategories = async (page: number = 1, query?: string): Promise<Paginated<CategoryWithChildrens>> => {
  const url = makeUrl(`${API_URL}/categories`, { page, query });
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, next: { tags: [CACHE_CATEGORIES] } });

  const result = await response.json();
  if (result.error) throw new GeneralError(result?.error?.message, { ishandledError: true, statusCode: result?.error?.statusCode });

  return result;
};
export const allCategories = async (): Promise<CategoryWithChildrens[]> => {
  
  const url = `${API_URL}/categories/all`;
  const result = await prisma.category.findMany({
    orderBy: [{ createdAt: 'desc' }],
    include: { subCategories: { select: { id: true, name: true } } },
  });;

  return result;
};

export const getLandingCategories = async (): Promise<Category[]> => {
  const res = await prisma.category.findMany({
    where: {
      isMain: true,
    },
  });
  return res;
};
export const searchCategories = async (query: string): Promise<Category[]> => {
  const res = await prisma.category.findMany({ where: { name: { contains: `%${query}%`, mode: 'insensitive' } } });
  return res;
};

export async function createCategory(body: CreateCategory) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, CreateCategory);
  const res = await prisma.category.create({
    data: {
      name: body.name,
      image: body.image,
      isMain: body.isMain,
    },
  });
  revalidateTag(CACHE_CATEGORIES);
  return res;
}

export async function updateCategory(body: UpdateCategory) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, UpdateCategory);
  const res = await prisma.category.update({
    where: { id: body.id },
    data: {
      name: body.name,
      image: body.image,
      isMain: body.isMain,
    },
  });
  revalidateTag(CACHE_CATEGORIES);
  return res;
}

export async function deleteCategory(body: DeleteCategory) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, DeleteCategory);
  const res = await prisma.category.delete({ where: { id: body.id } });
  revalidateTag(CACHE_CATEGORIES);
  return res;
}
