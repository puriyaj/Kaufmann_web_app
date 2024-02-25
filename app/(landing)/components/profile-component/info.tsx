import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { Session } from 'inspector';
import { userAgent } from 'next/server';
function Info() {
  const { data, status } = useSession();
  return (
    <>
     <div className='grid grid-cols-2 grid-rows-3 gap-20 p-5   bg-gray-100 rounded-2xl shadow-xl h-full'>
<div className='border-b-4 flex justify-between gap-20'>
  <div>
    <p>Name & Last Name</p>
     <p>{data?.user.name}</p> 
  </div>
     <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20'>
      
      <div>
     <p>Phone Number</p>
     <p>۰۹۱۲۰۰۰۰۰۰</p> 
      </div>
      <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20'>
      <div>
        <p>Date of Birth</p>
     <p>۰۱،۰۲،۱۹۹۹</p> 
      </div>
     
    </div>

    <div className='border-b-4 flex justify-between gap-20'>
    <div>
        <p>Account</p>
     <p>Premium</p> 
        </div>
        <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20'>
    <div>
        <p>Email</p>
     <p>{data?.user.email}</p> 
        </div>
        <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20'>
    <div>
       <p>password</p>
     <p>{data?.user.password}</p>  
        </div>
        <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>
          </div>

    </>
  )
}

export default Info