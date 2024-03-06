import React from 'react';
import { ProductCard } from './product-card';

export const ProductsSlider = () => {
  return (
    <section className="archive-category rt">
      <div className="main">
        <div className="entery rt">
          <div className="title rt rt-relative">
            <h3 className="name rt-22 rt-444 rt-medium">
              <a href="#" className="rt-medium rt-444">
                 Mobile
              </a>
            </h3>
            <a href="#" className="show-all left">
               More Products
            </a>
          </div>
          <div className="slider-5 rt rt-relative owl-carousel">
         
            {/* <ProductCard />
            <ProductCard />
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
