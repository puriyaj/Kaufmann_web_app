import React from 'react';
import { CategoryCard } from './category-card';
import { Category } from '@prisma/client';

export const CategorySection: React.FC<{ categories?: Category[] }> = ({ categories }) => {
  return (
    <section className="choose-category rt">
      <div className="main">
        <div className="entery rt">
          <h2 className="rt rt-align rt-20">
            بیش از <span className="rt-400">۲،۰۰۰</span> کالا در دسته‌بندی‌های مختلف
          </h2>
          <div className="inside rt rt-align">{categories?.map((it) => <CategoryCard key={it.id} category={it} />)}</div>
        </div>
      </div>
    </section>
  );
};
