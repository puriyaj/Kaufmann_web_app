import React from 'react';
import { ProductsList } from './products-list';
import { getProducts } from 'actions/product.action';
import { IPageProps } from 'types/page';

export const dynamic = 'force-dynamic';

export default async function page({ searchParams }: IPageProps) {
  const page = Number(searchParams.page ?? 1);
  const query = searchParams.query ?? undefined;
  const subCategoryId = searchParams.cat ?? undefined;
  const products = await getProducts(page, query, subCategoryId);

  return <ProductsList products={products} />;
}
