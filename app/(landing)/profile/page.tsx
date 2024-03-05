'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Order from '../components/profile-component/order';
import Info from '../components/profile-component/info';
import List from '../components/profile-component/list';
import Payment from '../components/profile-component/payment';
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react';
import Menu from '../components/profile-component/menu';

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
         


          <div className='md:flex flex-col p-2  justify-center items-center gap-3  w-max h-full hidden'>
         <Menu />
</div>

        <div className='w-full'>
          <div className='p-2 h-full'>
           <Info />
</div>
</div>      
</div>   
    </>
  )
}



export default Profile
