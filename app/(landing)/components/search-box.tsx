'use client';
import { Product } from '../../../prisma/generated/client';
import { getProducts } from 'actions/product.action';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim().length < 2) return;
    getProducts(1, query, undefined).then((res) => {
      setProducts(res.data ?? []);
    });
  }, [query]);
  return (
    <div className="search-box right rt-relative">
      <input onChange={(e) => setQuery(e.target.value ?? '')} className="rt rt-30px rt-400 rt-13" type="text" placeholder="         Find Your Product Hier" />
      <i className="fa fa-search rt-absolute left"></i>
      <span className="close" id="close-search">
        Close
      </span>
      <span className="close" id="close-search-bg"></span>
      {query.trim().length > 1 && (
        <ul className="search_result rt rt-14 rt-absolute rt-bg rt-10px">
          <h4>
            <span className="badge badge-info">Products</span>
          </h4>
          <div id="search_products">
            {products?.map((it) => (
              <li key={it?.id}>
                <Link href={`/products/${it?.id}`}>{it?.name}</Link>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};
