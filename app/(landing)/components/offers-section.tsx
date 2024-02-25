import React from 'react';

export const OffersSection = () => {
  return (
    <section className="offers-choosen rt">
      <div className="main">
        <div className="bold-products left rt-bg rt-5px">
          <div className="title rt">
            <i className="fa fa-map-pin right"></i>
            <h4 className="left rt-16 rt-medium">محصولات منتخب</h4>
          </div>
          <div className="rt rt-relative slider-1 owl-carousel">
            <article className="rt rt-bg rt-10px rt-align rt-relative">
              <a href="#" className="rt-link rt-absolute rt"></a>
              <img src="/image/demo/1.jpg" className="photo mx-auto" />
              <h3 className="rt rt-555 rt-15 rt-400">ساعت تایوانی طرح گلد ورساچ</h3>
              <div className="rt rt-price">
                <del className="rt rt-14 rt-999">
                  <bdi>
                    900,000 <span>تومان</span>
                  </bdi>
                </del>
                <span className="darsad rt-medium rt-14 rt-5px rt-fff right">14%</span>
                <ins className="right rt-15 rt-5px rt-555 rt-medium">
                  <bdi className="rt-medium">
                    850,000 <span className="rt-medium">تومان</span>
                  </bdi>
                </ins>
              </div>
            </article>
          </div>
        </div>

        <div className="offers right rt-relative rt-bg rt-5px slider-1 owl-carousel">
          <article className="rt rt-bg rt-relative">
            <a href="#" className="rt-link rt-absolute rt"></a>
            <a href="#" className="photo right rt-10px rt-align rt-relative">
              <img src="/image/demo/7.jpg" />
              <span className="darsad rt-absolute rt-medium rt-5px rt-fff rt-15">25% تخفیف</span>
            </a>
            <div className="inside left">
              <h3 className="rt rt-555 rt-19 rt-medium">جاروبرقی ایرانی خارجی نانیوا مدل NVC-9830</h3>
              <div className="des rt rt-14 rt-555">
                <p>حمایت از تولید ایرانی</p>
              </div>
              <div className="rt rt-price">
                <del className="rt rt-14 rt-666">
                  <bdi>
                    900,000 <span>تومان</span>
                  </bdi>
                </del>
                <ins className="right rt-15 rt-5px rt-rang rt-medium">
                  <bdi className="rt-medium">
                    850,000 <span className="rt-medium">تومان</span>
                  </bdi>
                </ins>
              </div>
              <a href="#" className="rt-14 right rt-bold rt-bg rt-more rt-555 rt-relative rt-z-index">
                توضیحات بیشتر و خرید{' '}
                <span className="rt-medium rt-fff rt-color">
                  <i className="fa fa-shopping-basket"></i>
                </span>
                <div></div>
              </a>
              <span className="suspend rt rt-13">
                <i className="fa fa-car"></i> این کالا دارای ضمانت بازگشت وجه به مدت دو هفته است
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
