import React from 'react';
import { BannersList } from './banners-list';
import { getBanners } from 'actions/banner.action';

export const dynamic = 'force-dynamic';

export default async function page() {
  const banners = await getBanners();

  return <BannersList banners={banners ?? []} />;
}
