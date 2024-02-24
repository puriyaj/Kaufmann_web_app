import React from 'react';

export const FeaturesSection = () => {
  return (
    <section className="feature mostbehide rt">
      <div className="main">
        <div className="item right rt-bg">
          <div className="icon rt-50px rt-center">
            <img src="/image/icon-1.png" />
          </div>
          <div className="inside left">
            <h6 className="rt rt-400 rt-555 rt-15">ارسال رایگان</h6>
            <p className="rt rt-13 rt-300 rt-777">برای تمامی سفارشات</p>
          </div>
        </div>

        <div className="item right rt-bg">
          <div className="icon rt-50px rt-center">
            <img src="/image/icon-2.png" />
          </div>
          <div className="inside left">
            <h6 className="rt rt-400 rt-555 rt-15">بازگشت پول</h6>
            <p className="rt rt-13 rt-300 rt-777">در صورت عدم رضایت</p>
          </div>
        </div>

        <div className="item right rt-bg">
          <div className="icon rt-50px rt-center">
            <img src="/image/icon-3.png" />
          </div>
          <div className="inside left">
            <h6 className="rt rt-400 rt-555 rt-15">بررسی قبل از خرید</h6>
            <p className="rt rt-13 rt-300 rt-777">بدون هیچ مشکلی</p>
          </div>
        </div>

        <div className="item right rt-bg">
          <div className="icon rt-50px rt-center">
            <img src="/image/icon-4.png" />
          </div>
          <div className="inside left">
            <h6 className="rt rt-400 rt-555 rt-15">پرداخت ایمن</h6>
            <p className="rt rt-13 rt-300 rt-777">بهترین قیمت ها</p>
          </div>
        </div>

        <div className="item right rt-bg">
          <div className="icon rt-50px rt-center">
            <img src="/image/icon-5.png" />
          </div>
          <div className="inside left">
            <h6 className="rt rt-400 rt-555 rt-15">زیبایی سایت</h6>
            <p className="rt rt-13 rt-300 rt-777">یک قالب حرفه ای</p>
          </div>
        </div>
      </div>
    </section>
  );
};
