'use server';
import { API_URL, UNAUTORIZED_MESSAGE } from '@utils/constants';
import { GeneralError, ResponseEntity } from '@utils/genral-error';
import { validate } from '@utils/validator';
import { authOptions } from '@utils/auth';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { prisma } from '@utils/prisma';
import type {Banner} from '@prisma/client'
import { CACHE_BANNERS } from '@utils/cache-tags';
import { CreateBanner, DeleteBanner, UpdateBanner } from 'requests/banner.dto';

export const getBanners = async (): Promise<Banner[]> => {
  const url = `${API_URL}/banners`;
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, next: { tags: [CACHE_BANNERS] } });

  const result = await response.json();
  if (result.error) throw new GeneralError(result?.error?.message, { ishandledError: true, statusCode: result?.error?.statusCode });

  return result;
};

export const getLandingBanners = async (): Promise<Banner[]> => {
  const banners = await prisma.banner.findMany({
    where: {
      status: 'ACCEPTED',
    },
  });
  return banners;
};

export async function createBanner(body: CreateBanner) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, CreateBanner);
  const res = await prisma.banner.create({ data: body });
  revalidateTag(CACHE_BANNERS);
  return res;
}

export async function updateBanner(body: UpdateBanner) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, UpdateBanner);
  const res = await prisma.banner.update({
    where: { id: body.id },
    data: { title: body.title, image: body.image, link: body.link, position: body.position, status: body.status },
  });
  revalidateTag(CACHE_BANNERS);
  return res;
}

export async function deleteBanner(body: DeleteBanner) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, DeleteBanner);
  const res = await prisma.banner.delete({ where: { id: body.id } });
  revalidateTag(CACHE_BANNERS);
  return res;
}
