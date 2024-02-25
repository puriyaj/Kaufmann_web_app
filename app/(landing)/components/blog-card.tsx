import Image from 'next/image';
import React from 'react';

export const BlogCard = () => {
  return (
    <article className="right rt-bg rt-5px rt-overflow rt-relative">
      <a href="#" className="rt">
        <div className="photo rt">
          <Image src={`/image/demo/23.jpg`} width={500} height={300} alt="" />
        </div>
      </a>
      <div className="inside rt">
        <h2 className="rt rt-16 rt-relative">
          <a href="#" className="rt rt-555 rt-400">Why should we have the best? Simply</a>
        </h2>
        <div className="matn rt-14 rt">Lorem Ipsum is a dummy text produced with simplicity and unintelligibility in the printing industry, using graphic designers...</div>
        <span className="cate rt-666 rt-14 right rt-400">
          <div className="icon right rt-center rt-18">
            <i className="fa fa-eye"></i>
          </div>{' '}
          443 views
        </span>
        <span className="date rt-666 rt-14 left">29 Feb 2024</span>
      </div>
    </article>
  );
};
