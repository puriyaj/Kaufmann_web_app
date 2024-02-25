import React from 'react';
import { BlogCard } from './blog-card';

export const BlogSlider = () => {
  return (
    <section className="last-blogs itsins rt">
      <div className="main">
        <div className="entery rt">
          <h2 className="asli rt rt-align rt-23">
            <a href="#" className="rt-555">
                <span className="rt-400">Last Blogs</span> 
            </a>
          </h2>
          <div className="slider-4 rt rt-relative owl-carousel">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>
    </section>
  );
};
