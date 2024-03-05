'use server';
import { API_URL, UNAUTORIZED_MESSAGE } from '@utils/constants';
import { GeneralError, ResponseEntity } from '@utils/genral-error';
import { validate } from '@utils/validator';
import { authOptions } from '@utils/auth';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { prisma } from '@utils/prisma';
import type { UsrData } from '@prisma/client';
import { CACHE_BANNERS } from '@utils/cache-tags';
import { CreateBanner, DeleteBanner, UpdateBanner } from 'requests/banner.dto';

export const getUsers = async (): Promise<UsrData[]> => {
  const url = `${API_URL}/users`;
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, next: { tags: [CACHE_BANNERS] } });

  const result = await response.json();
  if (result.error) throw new GeneralError(result?.error?.message, { ishandledError: true, statusCode: result?.error?.statusCode });

  return result;
};



export async function createUser(body: UsrData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  
  const res = await prisma.usrData.create({ data: body });
  
  return res;
}

export async function updateUser(body: UsrData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error(UNAUTORIZED_MESSAGE);
  await validate(body, UpdateBanner);
  const res = await prisma.usrData.update({
    where: { id: body.id },
    data: { },
  });
  revalidateTag(CACHE_BANNERS);
  return res;
}


