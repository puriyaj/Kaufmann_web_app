import React from 'react';
import { ProductCard } from './product-card';

export const RecentlySection = () => {
  return (
    <section className="recently-products rt">
      <div className="main">
        <div className="entery rt">
          <div className="title rt">
            <span className="name rt-100 rt-42 rt-fff rt-22 right">
               <span className="rt-400">Recent Products</span> 
            </span>
            <a href="/products" className="left rt-fff rt-15 rt-5px more">
               More Products
            </a>
          </div>
          <div className="slider-5 rt rt-relative owl-carousel">
            {/* <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
