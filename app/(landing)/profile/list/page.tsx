import React from 'react'
import Image from 'next/image'
import Menu from 'app/(landing)/components/profile-component/menu'
const List = () => {
  return (
    <>
    <div className='flex flex-row w-full '>
         


         <div className='md:flex flex-col p-2  justify-center items-center gap-3  w-max h-full hidden'>
        <Menu />
</div>

       <div className='w-full'>
         <div className='p-2 h-full'>
         <div className='w-40 flex flex-col items-center bg-gray-100 rounded-xl p-3'>
    <Image src='/image/product/product-01.png' width={200} height={200} alt='Product ' /> 
    <div className='flex flex-col items-center justify-center w-full'>
      <h2 className='font-bold'>Apple watch</h2> 
      <div className='flex flex-col justify-start'>
        <p>new apple watsch from apple with 2 years garantee ...</p>
    <p className='text-blue-500'>Read more</p>
      </div>
   
    </div>
    <p className='text-yellow-400'>230.99 Euro</p>
    <div>
      <button className='bg-yellow-300 shadow-lg rounded-lg p-2 w-full hover:bg-yellow-400 hover:text-white'>Add to Card</button>
    </div>
    </div>
</div>
</div>      
</div> 
   
    
    </>
  )
}

export default List