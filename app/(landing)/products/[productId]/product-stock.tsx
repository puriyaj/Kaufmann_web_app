'use client';
import { getPrice } from '@utils/utils';
import React from 'react';
import { toast } from 'react-toastify';
import { ProductInfoWithComments } from 'types/types';

export const ProductStock: React.FC<{ product: ProductInfoWithComments }> = ({ product }) => {
  const stock = product?.stocks?.at(0);
  //   console.log('id', localStorage.getItem('id'));
  //   console.log('name', localStorage.getItem('name'));
  //   console.log('price', localStorage.getItem('price'));
  //   console.log('qty', localStorage.getItem('qty'));

  const addToCart = () => {
    if (!stock) return;
    // localStorage.setItem('id', product.id);
    // localStorage.setItem('name', product.name);
    // localStorage.setItem('price', String(stock.price));
    // localStorage.setItem('qty', '1');
    // toast.success('به سبد خرید اضافه شد');
  };
  return (
    <div className="side left rt-5px">
      <div className="icon rt-center rt-400 rt-666 rt-20 rt-bg right rt-50px">{stock?.inStock ?? '-'}</div>
      <span className="anbar right rt-14 rt-555">Out of Stock</span>
      <p className="price rt rt-15 rt-relative rt-5px rt-bg rt-align">
        {stock && stock?.discount > 0 && (
          <bdi className="rt-666 rt rt-400 lpr">
             Last Price : <del className="rt rt-16 rt-medium rt-444">{Number(stock?.price ?? 0).toLocaleString()} Euro</del>
          </bdi>
        )}
        <bdi className="rt-666 rt rt-400">
           Price : <ins className="rt rt-16 rt-medium rt-rang">{getPrice(stock)} Euro</ins>
        </bdi>
      </p>
      <button onClick={addToCart} className="addtocart rt-align rt rt-color rt-fff rt-5px rt-400 rt-15">
        <i className="fa fa-shopping-basket">Add to the Basket</i> 
      </button>
    </div>
  );
};
