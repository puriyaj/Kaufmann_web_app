'use client'
import { motion, AnimatePresence } from 'framer-motion';
import {  FaShoppingCart,FaUser} from 'react-icons/fa';
import { useState,useEffect } from 'react';
import { SearchBox } from '../../components/search-box';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react"

import Menu from '../profile-component/menu';

const NavBar = () =>{
  const { data: session, status } = useSession()
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoginMenuOpen, setLoginMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    setLoginMenuOpen(false); // Close login menu when main menu opens
  };
  const toggleLoginMenu = () => {
    setLoginMenuOpen(!isLoginMenuOpen);
    setMenuOpen(false); // Close main menu when login menu opens
  };
  const menuVariants = {
    hidden: { opacity: 0, x: '-100%' },
    visible: { opacity: 1, x: 0 },
  };


  return (
    
    <>
     <nav className="bg-white shadow-lg p-4">
      <div className="container mx-auto flex items-center justify-between relative">
       
          <div className="text-red-500 text-2xl font-bold pt-3">Kaufmann</div>
          <div className=''>
            <SearchBox />
          </div>
          
         <div></div>
          </div>
        
        
       
          <div className='flex justify-between pt-5'>
                
      
         

        <div className='flex gap-2 '>
        <div
            className="text-gray-800 mr-4 cursor-pointer"
            onClick={toggleLoginMenu}
          >
            <div>
              {session?.user.name ? <Image onClick={toggleLoginMenu} className='rounded-full ' src={session?.user.image as string} width={24} height={24} alt=''/> : <FaUser onClick={toggleLoginMenu} size={24}/>}
              
            </div>
            
          </div>

          <div className="text-gray-800 cursor-pointer">
            <FaShoppingCart size={24} />
          </div>
        </div>
        <div>
              <button
            className={`text-gray-800 md:hidden bg-transparent focus:outline-none mr-4`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        <div className='text-gray-800 md:flex gap-10 pr-5 hidden items-end'>
        <Link href='/'>Home</Link>
        <Link href='/'>Products</Link>
        <Link href='/'>About</Link>
        <Link href='/'>Contact</Link>
          </div>
        </div>
    
          </div>
     
          
       

        {/* Both Menus */}
       
     
    </nav>
    
    <AnimatePresence >
          {(isMenuOpen || isLoginMenuOpen) && (
            <motion.div
              className={`sticky top-[7.7rem] ${isMenuOpen ? 'right-1' : 'left-1'} ${status =='authenticated' ? '' : 'bg-[#e0e0e0]'}  w-fit p-4 rounded-md shadow-md`}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ ease: 'easeOut', duration: 0.3 }}
            >
              <button  onClick={toggleMenu}>
              <ul className="flex flex-col justify-end items-start space-y-4">
                {isMenuOpen && (
                  <>
                  
                    <li>
                      <Link
                        href="/"
                        className="text-gray-800 hover:text-gray-300 transition duration-300"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-gray-800 hover:text-gray-300 transition duration-300"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <a
                        href="/services"
                        className="text-gray-800 hover:text-gray-300 transition duration-300"
                      >
                        Services
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-gray-800 hover:text-gray-300 transition duration-300"
                      >
                        Contact
                      </Link>
                    </li>
                    
                    
                  </>
                )}</ul>
                </button>
                
                {isLoginMenuOpen && (<>
                {status == 'authenticated' ?  <ul>
                  <button className='flex flex-col justify-start md:hidden' onClick={toggleLoginMenu}>
                     
                   <Menu />
                    
                  </button>
                    </ul> :  <>
                  <ul>
                  <button className='flex flex-col justify-start' onClick={toggleLoginMenu}>

                    <li>
                      <Link
                        href="/login"
                        className="text-white hover:text-gray-300 transition duration-300"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/register"
                        className="text-white hover:text-gray-300 transition duration-300"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </button>
                    </ul>
                  </>}
                </>
                 
                )}
              
            </motion.div>
          )}
        </AnimatePresence>
    </>
  )
}
export default NavBar