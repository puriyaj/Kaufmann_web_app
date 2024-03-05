'use client'
import React, { ReactHTML, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react';

const menu = [
  {
    name: 'Profile',
    img:'/image/icon/avatar-svgrepo-com.svg',
    page: '/profile/info' ,
    num: 0
  },
  {
    name: 'My Products',
    img:'/image/icon/heart-svgrepo-com.svg',
    page: '/profile/list' ,
    num: 1
  },
  {
    name: 'My Orders',
    img:'/image/icon/shopping-cart-svgrepo-com.svg',
    page:  '/profile/order',
    num: 2
  },
  {
    name: 'Payment',
    img:'/image/icon/monitor-svgrepo-com.svg',
    page:  '/profile/peyment',
    num: 3
  },
  {
    name: 'Exit',
    img:'/image/icon/exit.svg',
    page: '' ,
    num: 4
  }
]

function Menu() {
  const { data, status } = useSession();
  const [click,setClick] = useState(0)
  const handleClick = (a:number) =>{
    setClick(a)
 
  }
  
  return(
    <>
        ‍
      <div className='bg-Neutral-200  rounded-2xl shadow-lg p-5'>
      <div className='flex flex-col justify-center items-center pt-5 gap-10'>
          <Image  src={`${data?.user.image ? data?.user.image:'/image/avatar.jpg' }`} className={`rounded-full `}  width={80} height={80} alt="logo" />
    <p className={`pb-2 `} >{data?.user.name}</p>

    </div>

    <ul className='flex flex-col gap-10 md:gap-3 pt-2 w-fit justify-center '>
      {menu.map((item,index )=>(
         <div key={index} className='flex gap-2'>
        
        <button onClick={() => (handleClick(item.num),index == 4 && signOut({ callbackUrl: 'https://kaufmann-web-app.vercel.app' }))} className={`bg-gray-150 rounded-lg p-2 w-full hover:bg-gray-200 ${click == index && 'bg-[#e0e0e0] text-gray-800'}`}>
          <Link href={item.page} className='flex p-1 '>
            <Image src={item.img} width={20} height={20} alt = 'logo' className='pr-1  '/>
          <p className='w-[7rem]'>{item.name}</p>
          </Link>
        </button>
      </div>
      ))}
     
      
    
    </ul>   
      

    </div>


        
    </>
  )
}
export default Menu