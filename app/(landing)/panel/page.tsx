import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Panel() {
  return (<>
  <div className='flex flex-col justify-center items-center w-full'>
    <Image src='/image/empty-cart.svg' width={300} height={300} alt='box'/>
    <p>سبد خرید شما خالی است</p>
 
   <div className='border w-fit flex flex-col justify-center items-center p-2'>
    <Link href='/login' className='flex flex-col justify-center items-center'>
    <p className='font-bold '>ورود به حساب کاربری</p>
    <p>برای مشاهده محصولاتی که پیش تر خرید کرده اید وارد شوید</p>
    </Link>
    
   </div>
    </div>
  </>
   
  )
}

export default Panel