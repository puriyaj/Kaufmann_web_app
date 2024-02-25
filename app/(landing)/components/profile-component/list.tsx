import React from 'react'
import Image from 'next/image'
function List() {
  return (
    <>
    <div className='w-40 flex flex-col items-center bg-gray-100 rounded-xl p-3'>
    <Image src='/image/product/product-01.png' width={200} height={200} alt='Product ' /> 
    <div className='flex flex-col items-center justify-center w-full'>
      <h2 className='font-bold'>ساعت اپل</h2> 
    <p>عجب ساعتیه بکنش توی کونت حالشو ببر</p>
    </div>
    <p className='text-yellow-400'>۲.۳۰۰.۰۰۰ تومان</p>
    <div>
      <button className='bg-gray-300 rounded-lg p-2 w-full hover:bg-gray-500 hover:text-white'>افزودن به سبد خرید</button>
    </div>
    </div>
    
    </>
  )
}

export default List