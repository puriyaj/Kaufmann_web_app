import React from 'react'
import Image from 'next/image'

const data = [
  {
    img: '/image/product/product-01.png',
    name:'ساعت اپل',
    date:'۰۴،۰۵،۱۴۰۲',
    price:'۲،۳۰۰،۰۰۰',
    payment:'انلاین',
    delivery: 'در حال ارسال'
  },
  {
    img: '/image/product/product-02.png',
    name:'لپ تاپ اپل',
    date:'۱۱،۰۳،۱۴۰۱',
    price:'۴۰،۰۰۰،۰۰۰',
    payment:'وجه نقد',
    delivery: 'ارسال موفق'
  },
  {
    img: '/image/product/product-03.png',
    name:'لپ تاپ دل',
    date:'۰۷،۱۱،۱۳۹۸',
    price:'۳۵،۰۰۰،۰۰۰',
    payment:'انلاین',
    delivery: 'ارسال موفق'
  },
  {
    img: '/image/product/product-04.png',
    name:'لپ تاپ کیری',
    date:'۲۸،۰۷،۱۳۹۸',
    price:'۳۸،۰۰۰،۰۰۰',
    payment:'انلاین',
    delivery: 'ارسال موفق'
  }
  
]
const Order = () => {
  return (
    <>
    <table className='bg-gray-100 w-full rounded-xl p-3 h-full shadow-lg'>
  <tr className='bg-gray-50 border-b-2 border-gray-200 rounded-xl'>
    <th className='text-right pr-10'>محصولات</th>
    <th className='text-right'>تاریخ خرید</th>
    <th className='text-right'>قیمت</th>
    <th className='text-right'>پرداخت</th>
    <th className='text-right'>وضعیت ارسال</th>
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
    <td className={`${item.delivery === 'ارسال موفق' && 'text-green-500 '} ${item.delivery != 'ارسال موفق' && 'text-yellow-500 '}`}>{item.delivery}</td>
    </tr>
    )}
   
  
</table>
    </>
  )
}

export default Order