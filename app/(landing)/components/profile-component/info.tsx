'use client'
import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { useState } from 'react';




const Info = () => { 
  const { data, status } = useSession();
  const [val,setVal] = useState<boolean>(true)
  const [value,setValue] = useState('')
  const handleClick = () => {
    setVal(false)
  }
  return (
    <>
     <div className='grid md:grid-cols-2  gap-20 p-5   rounded-2xl shadow-xl h-full grid-cols-1 '>
<div className='border-b-4 flex justify-between gap-20 border-[#e0e0e0]'>
  <div>
    <p>Name & Last Name</p>
     <input className={`${val === false && 'border border-gray-200'}`} type='name' placeholder={data?.user.name as string}  readOnly={val}/> 
  </div>

  <button type='submit' onClick={() => handleClick()}>
    {val === false ?<Image  src="/image/icon/submit.svg" width={30} height={30} alt="logo" /> :<Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" /> }
     
     </button>
    </div>

    <div className='border-b-4 flex justify-between gap-20 border-[#e0e0e0]'>
      
      <div>
     <p>Phone Number</p>
     <p>+491764537829</p> 
      </div>
      <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20 border-[#e0e0e0]'>
      <div>
        <p>Date of Birth</p>
     <p>05.07.2000</p> 
      </div>
      <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20 border-[#e0e0e0]'>
    <div>
        <p>Account</p>
     <p className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg p-1 text-black'>Premium</p> 
        </div>
        <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20 border-[#e0e0e0]'>
    <div>
        <p>Email</p>
     <p>{data?.user.email}</p> 
        </div>
        <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20 border-[#e0e0e0]'>
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