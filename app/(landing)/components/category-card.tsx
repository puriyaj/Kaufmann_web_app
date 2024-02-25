import { Category } from '@prisma/client';
import { CDN_URI } from '@utils/constants';
import { rand } from '@utils/utils';
import Image from 'next/image';
import React from 'react';

export const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <a href="#" className="right rt-10px rt-bg rt-relative">
      <Image src={`${CDN_URI}/${category?.image}`} width={80} height={100} alt={category?.name} className="mx-auto" />
      <div className="name rt rt-15 rt-555 rt-medium">{category?.name}</div>
      <div className="amount right rt-color rt-14 rt-medium rt-fff rt-absolute">125</div>
    </a>
  );
};
