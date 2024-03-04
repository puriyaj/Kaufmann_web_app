'use server';
import { Category } from '@prisma/client';
import { CACHE_CATEGORIES, CACHE_SUB_CATEGORIES } from '@utils/cache-tags';
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
import { SubCategoryWithParent } from 'types/types';
import { CreateSubCategory, DeleteSubCategory, UpdateSubCategory } from 'requests/sub-category.dto';

export const getSubCategories = async (page: number, query?: string, categoryId?: string): Promise<Paginated<SubCategoryWithParent>> => {
  const url = makeUrl(`${API_URL}/sub-categories`, { page, query, categoryId });

  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, next: { tags: [CACHE_SUB_CATEGORIES] } });

  const result = await response.json();
  if (result.error) throw new GeneralError(result?.error?.message, { ishandledError: true, statusCode: result?.error?.statusCode });

  return result;
};

export const searchSubCategories = async (query: string): Promise<Category[]> => {
  const res = await prisma.subCategory.findMany({ where: { name: { contains: `%${query}%`, mode: 'insensitive' } } });
  return res;
};

export async function createSubCategory(body: CreateSubCategory) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, CreateSubCategory);
  const res = await prisma.subCategory.create({
    data: {
      name: body.name,
      image: body.image,
      isMain: body.isMain,
      categoryId: body.categoryId,
    },
  });
  revalidateTags();
  return res;
}

export async function updateSubCategory(body: UpdateSubCategory) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, UpdateSubCategory);
  const res = await prisma.subCategory.update({
    where: { id: body.id },
    data: {
      name: body.name,
      image: body.image,
      isMain: body.isMain,
      categoryId: body.categoryId,
    },
  });
  revalidateTags();

  return res;
}

export async function deleteSubCategory(body: DeleteSubCategory) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, DeleteSubCategory);
  const res = await prisma.subCategory.delete({ where: { id: body.id } });
  revalidateTags();
  return res;
}

const revalidateTags = () => {
  revalidateTag(CACHE_SUB_CATEGORIES);
  revalidateTag(CACHE_CATEGORIES);
};
