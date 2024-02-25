import { CDN_URI } from '@utils/constants';
import { rand } from '@utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProductWithCategoryAndStock } from 'types/types';

export const ProductCard: React.FC<{ product: ProductWithCategoryAndStock }> = ({ product }) => {
  const stock = product?.stocks?.at(0);
  return (
    <article className="mini-product rt-5px rt-bg rt-align rt-relative rt">
      <Link href={`/products/${product.id}`} className="rt-link rt-absolute rt"></Link>
      <Image src={`${CDN_URI}/${product.images[0]}`} alt="" width={150} height={100} className="photo mx-auto" />
      <h2 className="rt">
        <Link href={`/products/${product.id}`} className="rt rt-limit rt-15 rt-555 rt-medium">
          {product?.name}
        </Link>
      </h2>
      <div className="rt rt-price">
        {stock?.discount ? (
          <>
            <del className="rt rt-12 rt-999">
              <bdi>
                {Number(stock?.price ?? 0).toLocaleString()} <span>Euro</span>
              </bdi>
            </del>
            <span className="darsad rt-medium rt-12 rt-5px rt-fff right">{stock?.discount ?? 0}%</span>

            <ins className="right rt-14 rt-5px rt-555 rt-medium">
              <bdi className="rt-medium">
                {Number(Number(stock?.price ?? 0) - Number(stock?.price ?? 0) * (Number(stock?.discount ?? 0) / 100)).toLocaleString()} <span className="rt-medium">Euro</span>
              </bdi>
            </ins>
          </>
        ) : (
          <ins className="right rt-14 rt-5px rt-555 rt-medium">
            <bdi className="rt-medium">
              {Number(stock?.price ?? 0).toLocaleString()} <span className="rt-medium">Euro</span>
            </bdi>
          </ins>
        )}
      </div>
    </article>
  );
};
