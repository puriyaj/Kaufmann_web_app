import React from 'react';
import Image from 'next/image';
import SvgAdd from '@public/image/icon/plus.svg';
import SvgMinus from '@public/image/icon/minus.svg';
import SvgDelete from '@public/image/icon/delete.svg';
import { Button } from '@cmp/ui';
import { rand } from '@utils/utils';

export const Cart = () => {
  return (
    <div className="flex flex-col md:w-1/2 mx-auto">
      <h2 className="font-bold text-2xl text-center">Your Basket</h2>
      <div className="flex flex-row-reverse px-8">
        <button className="text-red-600 text-sm font-semibold border-2 rounded-lg px-2 py-1 hover:text-white hover:bg-red-500 border-red-400">Delete All Items</button>
      </div>
      <div className="flex justify-between p-8 shadow">
        <div className="flex gap-4 select-none">
          <Image src={`/image/demo/${rand(1, 21)}.jpg`} alt="" width={100} height={100} />
          <div className="flex flex-col justify-between">
            <h4 className="font-bold text-md">vacum cleaner Philips</h4>
            <span className="text-xs">Black</span>
            <div className="inline-flex gap-3 items-center">
              <span className="text-gray-500 cursor-pointer">
                <SvgAdd className="w-8 h-8" />
              </span>
              <span className="font-bold text-black select-none">1</span>
              <span className="text-gray-500 cursor-pointer">
                <SvgMinus className="w-8 h-8 " />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end select-none gap-4">
          <span className="font-bold text-sm">219,99</span>
          <span className="font-bold text-xs">Euro</span>
          <span className="border-2 border-red-600 rounded-lg px-0 py-3.5 flex justify-center w-7 h-7 items-center hover:bg-red-400 cursor-pointer">
            <SvgDelete className="w-5 h-5" />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl select-none mt-6 px-8 py-4 mx-10 md:mx-20 bg-amber-200">
        <div className="flex justify-between text-black font-semibold">
          <p> Total:</p>
          <p className="font-bold">
            710,99 <span className="text-xs font-bold">€</span>
          </p>
        </div>
        <button className="text-md text-white bg-orange-500 hover:bg-orange-600 font-semibold rounded-2xl px-2 py-2 ">Pay</button>
      </div>
    </div>
  );
};
