'use client'
import './style.css';
import Script from 'next/script';

import  CategoryListItem  from './components/category-list-item';

import { allCategories, getCategories } from 'actions/category.action';
import { FooterComponent } from './components/footer';


import { Toaster } from "@/components/ui/toaster"
import NavBar from './components/nav-components/user';
export const dynamic = 'force-dynamic';






export default function Layout({ children }: { children: React.ReactNode }) {
 
  return (
    <>
  
    <NavBar/>

 
 
      <main className=''>
        {children}
        
      </main>
      
 
      
      <FooterComponent />
       
      
      
    <Toaster/>
    <Script async src="/js/jquery.js" />
    <Script async src="/js/owl.carousel.js" />
    <Script async src="/js/java.js" />
   
    </>
  );

}
