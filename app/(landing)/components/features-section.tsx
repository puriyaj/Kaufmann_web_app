import React from 'react';
import Image from 'next/image';
export const FeaturesSection = () => {
  return (
    <section className="feature mostbehide rt">
      <div className="main">
        <div className="item right rt-bg">
          <div className="icon rt-50px rt-center">
            <Image width={40} height={40} alt='logo' src="/image/icon-1.png" />
          </div>
          <div className="inside left">
            <h6 className="rt rt-400 rt-555 rt-15"> Free shiping</h6>
            <p className="rt rt-13 rt-300 rt-777">for all Products </p>
          </div>
        </div>

        <div className="item right rt-bg">
          <div className="icon rt-50px rt-center">
            <Image width={40} height={40} alt='logo' src="/image/icon-2.png" />
          </div>
          <div className="inside left">
            <h6 className="rt rt-400 rt-555 rt-15"> Cash Back</h6>
            <p className="rt rt-13 rt-300 rt-777">In 14 Days </p>
          </div>
        </div>

        <div className="item right rt-bg">
          <div className="icon rt-50px rt-center">
            <Image width={40} height={40} alt='logo' src="/image/icon-3.png" />
          </div>
          <div className="inside left">
            <h6 className="rt rt-400 rt-555 rt-15">Technical Check </h6>
            <p className="rt rt-13 rt-300 rt-777"> On all Products</p>
          </div>
        </div>

        <div className="item right rt-bg">
          <div className="icon rt-50px rt-center">
            <Image width={40} height={40} alt='logo' src="/image/icon-4.png" />
          </div>
          <div className="inside left">
            <h6 className="rt rt-400 rt-555 rt-15"> Safe payment</h6>
            <p className="rt rt-13 rt-300 rt-777"> Best prices</p>
          </div>
        </div>

        <div className="item right rt-bg">
          <div className="icon rt-50px rt-center">
            <Image width={40} height={40} alt='logo' src="/image/icon-5.png" />
          </div>
          <div className="inside left">
            <h6 className="rt rt-400 rt-555 rt-15"> Beautiful web page</h6>
            <p className="rt rt-13 rt-300 rt-777"> Nice UI Design</p>
          </div>
        </div>
      </div>
    </section>
  );
};
