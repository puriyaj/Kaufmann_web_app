'use server';

import { validate } from '@utils/validator';
import { revalidateTag } from 'next/cache';
import { prisma } from '@utils/prisma';
import { CreateStock } from 'requests/stock.dto';
import { CACHE_PRODUCTS, CACHE_STOCKS } from '@utils/cache-tags';


// export const getStocks = async (): Promise<Banner[]> => {
//   const url = `${API_URL}/stocks`;
//   const response = await fetch(url, { headers: { "Content-Type": "application/json", Accept: "application/json" }, next: { tags: [CACHE_STOCKS] } });

//   const result = await response.json();
//   if (result.error) throw new GeneralError(result?.error?.message, { ishandledError: true, statusCode: result?.error?.statusCode });

//   return result;
// };

export async function createStock(body: CreateStock) {
  // const session = await getServerSession(authOptions);
  // console.log("session ====>", session?.user);
  await validate(body, CreateStock);

  const res = await prisma.stock.create({ data: { price: body.price, discount: body.discount, inStock: body.inStock, productId: body.productId, currency: body.currency } });
  revalidateTag(CACHE_STOCKS);
  revalidateTag(CACHE_PRODUCTS);
  console.log('res', res);
  return res;
}
