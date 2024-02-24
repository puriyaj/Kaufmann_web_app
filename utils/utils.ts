import { ACTIVATION_STATUS, Stock } from '@prisma/client';
import { NextRequest } from 'next/server';
import { Badge } from '@cmp/ui/components/badge';
import { activation_status_details } from './constants';

export const parse = (req: NextRequest) => {
  let domain = req.headers.get('host') as string;
  domain = domain.replace('www.', ''); // remove www. from domain

  // path is the path of the URL (e.g. dub.co/stats/github -> /stats/github)
  const path = req.nextUrl.pathname;

  // fullPath is the full URL path (along with search params)
  const searchParams = req.nextUrl.searchParams.toString();
  const fullPath = `${req.nextUrl.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  // Here, we are using decodeURIComponent to handle foreign languages like Hebrew
  const key = decodeURIComponent(path.split('/')[1]); // key is the first part of the path (e.g. dub.co/stats/github -> stats)
  const fullKey = decodeURIComponent(path.slice(1)); // fullKey is the full path without the first slash (to account for multi-level subpaths, e.g. dub.sh/github/repo -> github/repo)

  return { domain, path, fullPath, key, fullKey };
};

export const searchQueryParam = (key: string, value: string | string[] | undefined, oldparams: any, router: any, pathname: string) => {
  const newSP = new URLSearchParams(oldparams);
  if (!value) {
    newSP.delete(key);
  } else {
    if (Array.isArray(value)) {
      if (value.length == 0) {
        newSP.delete(key);
      } else {
        newSP.set(key, value[0]);
        value.forEach((v, idx) => {
          if (idx == 0) return;
          newSP.append(key, v);
        });
      }
    } else {
      newSP.set(key, value);
    }
  }
  router.push(pathname + '?' + newSP.toString());
};

export const realNumber = (input: any) => {
  if (typeof input === 'string') {
    return Number(input.replace(/,/g, ''));
  }
  return input;
};

export const perNumToEngNum = (s: any) => s.replace(/[۰-۹]/g, (d: any) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

export const makeUrl = (baseUrl: string, body: object) => {
  if (!body || Object.keys(body).length == 0) return baseUrl;

  let sq = new URLSearchParams();
  Object.entries(body).forEach(([key, value]) => {
    if (value || typeof value == 'boolean') {
      if (Array.isArray(value)) {
        value.forEach((el) => {
          sq.append(key, el);
        });
      } else {
        sq.append(key, value);
      }
    }
  });
  return baseUrl + '?' + sq.toString();
};

export const rand = (from: number, to: number): number => {
  return Math.floor(Math.random() * to) + from;
};

export const getPrice = (stock: Stock | undefined): string => {
  const discount = Number(stock?.discount ?? 0);
  const price = Number(stock?.price ?? 0);
  const discountPrice = price * (discount / 100);
  return (price - discountPrice).toLocaleString();
};
