import React from 'react'
import Image from 'next/image'
function Info() {
  return (
    <>
     <div className='grid grid-cols-2 grid-rows-3 gap-20 p-5   bg-gray-100 rounded-2xl shadow-xl h-full'>
<div className='border-b-4 flex justify-between gap-20'>
  <div>
    <p>نام و نام خانوادگی</p>
     <p>ایلمان</p> 
  </div>
     <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20'>
      
      <div>
     <p>شماره تلفن همراه</p>
     <p>۰۹۱۲۰۰۰۰۰۰</p> 
      </div>
      <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20'>
      <div>
        <p>تاریخ تولد</p>
     <p>۰۱،۰۲،۱۹۹۹</p> 
      </div>
     
    </div>

    <div className='border-b-4 flex justify-between gap-20'>
    <div>
        <p>کد ملی</p>
     <p>۰۰۲۸۳۸۴۸۴۸۵</p> 
        </div>
        <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20'>
    <div>
        <p>پست الکترونیک</p>
     <p>حمصلحنصلقنقحل</p> 
        </div>
        <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>

    <div className='border-b-4 flex justify-between gap-20'>
    <div>
       <p>رمز عبور</p>
     <p>۰۹۲۳۴۵۷۸۲۴۵۷</p>  
        </div>
        <Image src="/image/icon/edit.svg" width={30} height={30} alt="logo" />
    </div>
          </div>

    </>
  )
}

export default Info