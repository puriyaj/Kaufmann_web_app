import React from 'react';
import { IPageProps } from 'types/page';
import { SubCategoriesList } from './sub-categories-list';
import { getSubCategories } from 'actions/sub-category.action';

export const dynamic = 'force-dynamic';

export default async function page({ searchParams }: IPageProps) {
  const page = Number(searchParams.page ?? 1);
  const query = searchParams.query ?? undefined;
  const categoryId = searchParams.cat ?? undefined;
  const categories = await getSubCategories(page, query, categoryId);

  return <SubCategoriesList categories={categories ?? []} />;
}
