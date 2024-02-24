import React from 'react';

export const Pagination = () => {
  return (
    <div className="product-pagination rt rt-align rt-14">
      <a href="">
        <i className="fa fa-angle-right"></i> صفحه قبلی
      </a>
      <a href="" className="active">
        1
      </a>
      <a href="">
        صفحه بعدی <i className="fa fa-angle-left"></i>
      </a>
    </div>
  );
};
