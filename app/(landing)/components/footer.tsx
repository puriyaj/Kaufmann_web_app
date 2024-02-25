import React from 'react';

export const FooterComponent = () => {
  return (
    <footer>
      <div className="main">
        <div className="feature rt">
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
        </div>

        <div className="block-f block-f-1 right">
          <div className="title rt rt-relative">
            <h3 className="right rt-15 rt-555 rt-bold rt-relative">درباره ما</h3>
          </div>
          <p className="rt rt-555 rt-14">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
            شرایط فعلی تکنولوژی
          </p>
        </div>

        <div className="block-f block-f-2 right">
          <div className="title rt rt-relative">
            <h3 className="right rt-15 rt-555 rt-bold rt-relative">فهرست اصلی</h3>
          </div>
          <ul className="menu rt rt-14">
            <li className="rt">
              <a href="#" className="rt rt-555">
                <i className="fa fa-circle"></i> فروشگاه
              </a>
            </li>
            <li className="rt">
              <a href="#" className="rt rt-555">
                <i className="fa fa-circle"></i> وبلاگ
              </a>
            </li>
            <li className="rt">
              <a href="#" className="rt rt-555">
                <i className="fa fa-circle"></i> درباره ما
              </a>
            </li>
            <li className="rt">
              <a href="#" className="rt rt-555">
                <i className="fa fa-circle"></i> ارتباط با ما
              </a>
            </li>
          </ul>
        </div>

        <div className="block-f block-f-3 right">
          <ul className="rt rt-14 rt-555 address">
            <li className="rt">
              <i className="fa fa-map-o"></i> <span className="left">بندرترکمن خیابان استقلال- استقلال 28</span>
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
                mohammadmrb.org@gmail.com
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
          <img src="/image/demo/g.png" />
          <img src="/image/demo/h.png" />
        </div>
      </div>

      <div className="copyright rt">
        <div className="main rt-14 rt-100">این سایت توسط محمد امین اونق طراحی و کدنویسی شده است.</div>
      </div>
    </footer>
  );
};
