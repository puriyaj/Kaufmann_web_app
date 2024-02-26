import Image from 'next/image';
import React from 'react';

export const FooterComponent = () => {
  return (
    <footer>
      <div className="main">
        <div className="feature rt">
          <div className="main">
            <div className="item right rt-bg">
              <div className="icon rt-50px rt-center">
                <Image width={40} height={40} alt='logo' src="/image/icon-1.png" />
              </div>
              <div className="inside left">
                <h6 className="rt rt-400 rt-555 rt-15">Free Delivery</h6>
                <p className="rt rt-13 rt-300 rt-777">For All Products</p>
              </div>
            </div>
            <div className="item right rt-bg">
              <div className="icon rt-50px rt-center">
                <Image src="/image/icon-2.png" width={40} height={40} alt='logo'/>
              </div>
              <div className="inside left">
                <h6 className="rt rt-400 rt-555 rt-15">Money Back </h6>
                <p className="rt rt-13 rt-300 rt-777">in 14 Days</p>
              </div>
            </div>
            <div className="item right rt-bg">
              <div className="icon rt-50px rt-center">
                <Image width={40} height={40} alt='logo' src="/image/icon-3.png" />
              </div>
              <div className="inside left">
                <h6 className="rt rt-400 rt-555 rt-15">Technical Check</h6>
                <p className="rt rt-13 rt-300 rt-777">For All Products</p>
              </div>
            </div>
            <div className="item right rt-bg">
              <div className="icon rt-50px rt-center">
                <Image width={40} height={40} alt='logo' src="/image/icon-4.png" />
              </div>
              <div className="inside left">
                <h6 className="rt rt-400 rt-555 rt-15">Safe Payment</h6>
                <p className="rt rt-13 rt-300 rt-777">Best Prices</p>
              </div>
            </div>
            <div className="item right rt-bg">
              <div className="icon rt-50px rt-center">
                <Image width={40} height={40} alt='logo' src="/image/icon-5.png" />
              </div>
              <div className="inside left">
                <h6 className="rt rt-400 rt-555 rt-15">Beutiful website</h6>
                <p className="rt rt-13 rt-300 rt-777">Nice UI Design</p>
              </div>
            </div>
          </div>
        </div>

        <div className="block-f block-f-1 right">
          <div className="title rt rt-relative">
            <h3 className="right rt-15 rt-555 rt-bold rt-relative">About Us</h3>
          </div>
          <p className="rt rt-555 rt-14">Lorem Ipsum is a dummy text produced with simplicity and unintelligibility in the printing industry, using graphic designers. Printers and texts, whether newspapers or magazines, are arranged in columns and rows as needed for current technology conditions.
          </p>
        </div>

        <div className="block-f block-f-2 right">
          <div className="title rt rt-relative">
            <h3 className="right rt-15 rt-555 rt-bold rt-relative">Main Menu</h3>
          </div>
          <ul className="menu rt rt-14">
            <li className="rt">
              <a href="#" className="rt rt-555">
                <i className="fa fa-circle">Shop</i>
              </a>
            </li>
            <li className="rt">
              <a href="#" className="rt rt-555">
                <i className="fa fa-circle">Blog</i> 
              </a>
            </li>
            <li className="rt">
              <a href="#" className="rt rt-555">
                <i className="fa fa-circle">About Us</i>
              </a>
            </li>
            <li className="rt">
              <a href="#" className="rt rt-555">
                <i className="fa fa-circle">Contact</i>
              </a>
            </li>
          </ul>
        </div>

        <div className="block-f block-f-3 right">
          <ul className="rt rt-14 rt-555 address">
            <li className="rt">
              <i className="fa fa-map-o"></i> <span className="left">Berlin - Kreuzberg 9</span>
            </li>
            <li className="rt">
              <i className="fa fa-phone"></i>{' '}
              <a href="tel:01734482229" className="left rt-555">
                01734482229
              </a>
            </li>
            <li className="rt">
              <i className="fa fa-envelope-o"></i>{' '}
              <a href="mailt:mohammadmrb.org@gmail.com" className="left rt-555">
                puriyaj@gmail.com
              </a>
            </li>
          </ul>
          <div className="social right rt-16">
            <a href="#" className="right rt-666">
              <i className="fa fa-facebook-f"></i>
            </a>
            <a href="#" className="right rt-666">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="#" className="right rt-666">
              <i className="fa fa-telegram"></i>
            </a>
            <a href="#" className="right rt-666">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
        </div>

        <div className="block-f block-f-4 right rt-align">
          <Image width={40} height={40} alt='logo' src="/image/demo/g.png" className='w-auto h-auto' priority/>
          <Image width={40} height={40} alt='logo' src="/image/demo/h.png" className='w-auto h-auto' priority/>
        </div>
      </div>

      <div className="copyright rt">
        <div className="main rt-14 rt-100">Pouria Jangjooy Mehrangiz</div>
      </div>
    </footer>
  );
};
