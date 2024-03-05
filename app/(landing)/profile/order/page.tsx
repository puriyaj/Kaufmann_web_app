import React from 'react'
import Image from 'next/image'
import Menu from 'app/(landing)/components/profile-component/menu'

const data = [
  {
    img: '/image/product/product-01.png',
    name:' Apple watch',
    date:'04.01.2015',
    price:'230.99',
    payment:'online',
    delivery: 'on the way '
  },
  {
    img: '/image/product/product-02.png',
    name:'Macbook m1 pro',
    date:'03.01.2020',
    price:'1119.99',
    payment:'on the Door',
    delivery: 'success '
  },
  {
    img: '/image/product/product-03.png',
    name:'Dell Laptop ',
    date:'23.01.2020',
    price:'999.99',
    payment:'Online',
    delivery: 'success '
  },
  {
    img: '/image/product/product-04.png',
    name:'Lenovo thinkpad p1 pro',
    date:'01.08.2023',
    price:'1319.99',
    payment:'online',
    delivery: 'succes '
  }
  
]
const Order = () => {
  return (
    <>
    <div className='flex flex-row w-full '>
         


         <div className='md:flex flex-col p-2  justify-center items-center gap-3  w-max h-full hidden'>
        <Menu />
</div>

       <div className='w-full'>
         <div className='p-2 h-full'>

         <table className='bg-gray-100 w-full rounded-xl p-3 h-full shadow-lg '>
  <tr className='bg-gray-50 border-b-2 border-gray-200 rounded-xl'>
    <th className=' pr-10'>Products</th>
    <th className=''>Date </th>
    <th className=''>Price</th>
    <th className=''>Payment</th>
    <th className=''>Send</th>
  </tr>
 
    {data.map((item,index) => 
     <tr key={index} className=''>
     <td>
      <div className='flex gap-2 pr-5'>
        <Image src={item.img} width={40} height={40} alt = 'logo' />
       <p>{item.name}</p>
      </div>
       
     </td>
    <td>{item.date}</td>
    <td>{item.price}</td>
    <td>{item.payment}</td>
    <td className={`${item.delivery === 'success' && 'text-green-500 '} ${item.delivery != 'success' && 'text-yellow-500 '}`}>{item.delivery}</td>
    </tr>
    )}
   
  
</table>
</div>
</div>      
</div> 
   
    </>
  )
}

export default Order