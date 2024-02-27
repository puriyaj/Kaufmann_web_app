import React from 'react';
import  CategoryCard  from './category-card';
import { Category } from '../../../prisma/generated/client';

 const CategorySection: React.FC<{ categories?: Category[] }> = ({ categories }) => {
  return (
    <section className="choose-category rt">
      <div className="main">
        <div className="entery rt">
          <h2 className="rt rt-align rt-20">
              <span className="rt-400">More than 20,000 Products in all Categories</span>    
          </h2>
          <div className="inside rt rt-align">{categories?.map((it) => <CategoryCard key={it.id} category={it} />)}</div>
        </div>
      </div>
    </section>
  );
};
export default CategorySection