import React from 'react';
import { ProductCard } from '../components/product-card';
import { Pagination } from '../components/pagination';
import { IPageProps } from 'types/page';
import { getProducts } from 'actions/product.action';

export const dynamic = 'force-dynamic';

export default async function Page({ params, searchParams }: IPageProps) {
  const page = Number(searchParams.page ?? 1);
  const query = searchParams.query ?? undefined;
  const subCategoryId = searchParams.cat ?? undefined;
  const products = await getProducts(page, query, subCategoryId);
  return (
    <div className="list-products rt">
      <div className="main">
        <div className="title rt rt-relative">
          <h1 className="name rt-22 rt-444 rt-medium right rt-relative">List of Products</h1>
        </div>
        {products?.data?.map((it) => <ProductCard key={it.id} product={it} />)}

        <Pagination />
      </div>
    </div>
  );
}
