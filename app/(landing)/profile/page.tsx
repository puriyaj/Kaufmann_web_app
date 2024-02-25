'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Order from '../components/profile-component/order';
import Info from '../components/profile-component/info';
import List from '../components/profile-component/list';
import Payment from '../components/profile-component/payment';
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react';
const menu = [
  {
    name: 'Profile',
    img:'/image/icon/avatar-svgrepo-com.svg',
    page: <Info/> ,
    num: 0
  },
  {
    name: 'My Products',
    img:'/image/icon/heart-svgrepo-com.svg',
    page: <List/> ,
    num: 1
  },
  {
    name: 'My Orders',
    img:'/image/icon/shopping-cart-svgrepo-com.svg',
    page: <Order/> ,
    num: 2
  },
  {
    name: 'Payment',
    img:'/image/icon/monitor-svgrepo-com.svg',
    page: <Payment/> ,
    num: 3
  },
  {
    name: 'Exit',
    img:'/image/icon/exit.svg',
    page: '' ,
    num: 4
  }
]
function Profile() {
  const { data, status } = useSession();
  const [click,setClick] = useState(0)
  const handleClick = (a:number) =>{
    setClick(a)
 
  }
  return (
    


    <>
          <div className='flex flex-row w-full '>
             ‍<div className='flex flex-col p-2  justify-center items-center gap-3  w-max h-full'>
      <div className='bg-gray-100 p-10 rounded-2xl shadow-lg'>
      <div className='flex flex-col justify-center items-center pt-5'>
          <Image src={`${data?.user.image ? data?.user.image:'/image/avatar.jpg' }`} className='rounded-full' width={80} height={80} alt="logo" />
    <p className='pt-2'>{data?.user.name}</p>

    </div>

    <ul className='flex flex-col gap-3 pt-2 w-max justify-center '>
      {menu.map((item,index )=>(
         <div key={index} className='flex gap-2'>
        <Image src={item.img} width={20} height={20} alt = 'logo' />
        <button onClick={() => (handleClick(item.num),index == 4 && signOut({ callbackUrl: 'http://localhost:3000/' }))} className={`bg-gray-300 rounded-lg p-2 w-full hover:bg-gray-500 ${click == index && 'bg-gray-500 text-white'}`}>{item.name}</button>
      </div>
      ))}
     
      
    
    </ul>   
      

    </div>


        </div>
        <div className='w-full'>
          <div className='p-2 h-full'>
           {menu.map((items)=> click == items.num &&  items.page)}
</div>
</div>      
</div>   
    </>
  )
}



export default Profile
