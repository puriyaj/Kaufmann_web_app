import React from 'react';
import { ProductCard } from '../components/product-card';
import { Pagination } from '../components/pagination';
import { IPageProps } from 'types/page';
import { CACHE_PRODUCTS } from '@utils/cache-tags';
import { makeUrl } from '@utils/utils';
import { Paginated } from 'types/page';
import { ProductInfoWithComments, ProductWithCategoryAndStock } from 'types/types';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
 
type Repo = {
  name: string
  stargazers_count: number
}

export const dynamic = 'force-dynamic';
export const getProducts = async (page: number, query?: string, subCategoryId?: string): Promise<Paginated<ProductWithCategoryAndStock>> => {
  const url = makeUrl(`https://${process.env.VERCEL_URL}/api/products`, { page, query, subCategoryId });

  const response = await fetch(url, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, next: { tags: [CACHE_PRODUCTS] } });

  const result = await response.json();
  return result;
};

export default async function Page({ searchParams }: IPageProps) {
  const page = Number(searchParams.page ?? 1);
  const query = searchParams.query ?? undefined;
  const subCategoryId = searchParams.cat ?? undefined;
  const products = await getProducts(page, query, subCategoryId);
  return (
    <div className="list-products rt">
      <div className="main">
        <div className="title rt rt-relative">
          <h1 className="name rt-22 rt-444 rt-medium right rt-relative">لیست محصولات فروشگاه</h1>
        </div>
        {products?.data?.map((it) => <ProductCard key={it.id} product={it} />)}

        <Pagination />
      </div>
    </div>
  );
}
