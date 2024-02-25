import React from 'react';
import { CategoriesList } from './categories-list';
import { getCategories } from 'actions/category.action';
import { IPageProps } from 'types/page';
export const dynamic = 'force-dynamic';

export default async function page({ searchParams }: IPageProps) {
  const page = Number(searchParams.page ?? 1);
  const query = searchParams.query ?? undefined;
  const categoryId = searchParams.cat ?? undefined;
  const categories = await getCategories(page, query);

  return <CategoriesList categories={categories ?? []} />;
}
