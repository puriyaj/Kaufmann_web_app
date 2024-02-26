import React from 'react';
import Image from 'next/image';
export const OffersSection = () => {
  return (
    <section className="offers-choosen rt">
      <div className="main">
        <div className="bold-products left rt-bg rt-5px">
          <div className="title rt">
            <i className="fa fa-map-pin right"></i>
            <h4 className="left rt-16 rt-medium">Best Seller</h4>
          </div>
          <div className="rt rt-relative slider-1 owl-carousel">
            <article className="rt rt-bg rt-10px rt-align rt-relative">
              <a href="#" className="rt-link rt-absolute rt"></a>
              <Image width={400} height={400} alt='logo' src="/image/demo/1.jpg" className="photo mx-auto w-auto h-auto" priority/>
              <h3 className="rt rt-555 rt-15 rt-400">Food Cream COMEON 400ml</h3>
              <div className="rt rt-price">
                <del className="rt rt-14 rt-999">
                  <bdi>
                    90,99 <span>Euro</span>
                  </bdi>
                </del>
                <span className="darsad rt-medium rt-14 rt-5px rt-fff right">14%</span>
                <ins className="right rt-15 rt-5px rt-555 rt-medium">
                  <bdi className="rt-medium">
                    85,99 <span className="rt-medium">Euro</span>
                  </bdi>
                </ins>
              </div>
            </article>
          </div>
        </div>

        <div className="offers right rt-relative rt-bg rt-5px slider-1 owl-carousel">
          <article className="rt rt-bg rt-relative">
            <a href="#" className="rt-link rt-absolute rt"></a>
            <a href="#" className="photo right rt-10px rt-align rt-relative ">
              <Image 
              className='w-auto h-auto' width={1000} height={1000} alt='logo' src="/image/demo/2.jpg"  priority/>
              <span className="darsad rt-absolute rt-medium rt-5px rt-fff rt-15">25% off</span>
            </a>
            <div className="inside left">
              <h3 className="rt rt-555 rt-19 rt-medium">Vakuum cleaner Model NVC-9830</h3>
              <div className="des rt rt-14 rt-555">
                <p>Philips</p>
              </div>
              <div className="rt rt-price">
                <del className="rt rt-14 rt-666">
                  <bdi>
                    109,99 <span>Euro</span>
                  </bdi>
                </del>
                <ins className="right rt-15 rt-5px rt-rang rt-medium">
                  <bdi className="rt-medium">
                    98,99 <span className="rt-medium">Euro</span>
                  </bdi>
                </ins>
              </div>
              <a href="#" className="rt-14 right rt-bold rt-bg rt-more rt-555 rt-relative rt-z-index">
                  Read more {' '}
                <span className="rt-medium rt-fff rt-color">
                  <i className="fa fa-shopping-basket"></i>
                </span>
                <div></div>
              </a>
              <span className="suspend rt rt-13">
                <i className="fa fa-car"> with 2 years Garantie</i>  
              </span>
            </div>
          </article>
        </div>
      </div>
      
    </section>
  );
};
