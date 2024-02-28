import { ACTIVATION_STATUS, Product } from '../prisma/generated/client';
import { CACHE_PRODUCTS } from '@utils/cache-tags';
import { API_URL, UNAUTORIZED_MESSAGE } from '@utils/constants';
import { GeneralError, ResponseEntity } from '@utils/genral-error';
import { validate } from '@utils/validator';
import { authOptions } from '@utils/auth';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { prisma } from '@utils/prisma';
import { CreateProduct, DeleteProduct, UpdateProduct } from 'requests/product.dto';
import { makeUrl } from '@utils/utils';
import { Paginated } from 'types/page';
import { ProductInfoWithComments, ProductWithCategoryAndStock } from 'types/types';

export const getProducts = async (page: number, query?: string, subCategoryId?: string): Promise<Paginated<ProductWithCategoryAndStock>> => {
  const url = makeUrl(`${API_URL}/products`, { page, query, subCategoryId });

  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, next: { tags: [CACHE_PRODUCTS] } });

  const result = await response.json();
  return result;
};

export async function productInfo(id: string): Promise<ProductInfoWithComments> {
  if (!id) throw new Error('آیدی یافت نشد');
  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      subCategory: true,
      stocks: true,
      comments: { where: { status: ACTIVATION_STATUS.ACCEPTED } },
    },
  });
  if (!product) throw new Error('محصول مورد نظر یافت نشد');
  return product;
}

export async function createProduct(body: CreateProduct) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, CreateProduct);
  const { name, subCategoryId, images, description, isActive, isMain, status, tags } = body;

  const res = await prisma.product.create({ data: { userId: session.user.id, name, subCategoryId, images, description, isActive, isMain, status, tags } });
  revalidateTag(CACHE_PRODUCTS);
  return res;
}

export async function updateProduct(body: UpdateProduct) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);

  await validate(body, UpdateProduct);
  const { name, subCategoryId, images, description, isActive, isMain, status, tags } = body;

  const res = await prisma.product.update({
    where: { id: body.id, userId: session.user.id },
    data: { userId: session.user.id, name, subCategoryId, images, description, isActive, isMain, status, tags },
  });
  revalidateTag(CACHE_PRODUCTS);
  return res;
}

export async function deleteProduct(body: DeleteProduct) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);

  await validate(body, DeleteProduct);
  const res = await prisma.product.delete({ where: { id: body.id, userId: session.user.id } });
  revalidateTag(CACHE_PRODUCTS);
  return res;
}
