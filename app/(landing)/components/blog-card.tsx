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
          <a href="#" className="rt rt-555 rt-400">
            چرا باید بهترین ها را داشته باشیم؟ به سادگی
          </a>
        </h2>
        <div className="matn rt-14 rt">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک ...</div>
        <span className="cate rt-666 rt-14 right rt-400">
          <div className="icon right rt-center rt-18">
            <i className="fa fa-eye"></i>
          </div>{' '}
          443 بازدید
        </span>
        <span className="date rt-666 rt-14 left">29 فروردین 1400</span>
      </div>
    </article>
  );
};
