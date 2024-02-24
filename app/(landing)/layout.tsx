
import './style.css';
import Script from 'next/script';
import Link from 'next/link';
import { CategoryListItem } from './components/category-list-item';
import Image from 'next/image';
import { allCategories, getCategories } from 'actions/category.action';
import { FooterComponent } from './components/footer';
import { SearchBox } from './components/search-box';
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/auth";
export const dynamic = 'force-dynamic';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const categories = await allCategories();
  const session = await getServerSession(authOptions);
  
  return (
    <>
      {/* <Nav /> */}
      <header className="">
        <nav className="rt">
          <div className="main">
            <div className="notic right">
              <div className="icon rt-bg right rt-50px rt-center rt-rang rt-16">
                <i className="fa fa-percent"></i>
              </div>
              <span className="right rt-15 rt-666">
                ارسال رایگان برای سفارش های بالای <samp className="rt-medium">200 هزار تومان</samp> به بالا
              </span>
            </div>

            <a href="mailto:address@email.com" className="left">
              <span className="right rt-15 rt-666">youraddress@email.com</span>
              <div className="icon rt-bg right rt-50px rt-center rt-rang rt-16">
                <i className="fa fa-envelope-o"></i>
              </div>
            </a>
            <a href="tel:+989211111111" className="left">
              <span className="right rt-15 rt-666">092154545481</span>
              <div className="icon rt-bg right rt-50px rt-center rt-rang rt-16">
                <i className="fa fa-phone"></i>
              </div>
            </a>
          </div>
        </nav>
        <div className="main">
          <Link href="/">
            <Image src="/image/logo.png" width={150} height={45} alt="" className="logo right" />
          </Link>

          <SearchBox />

          <div className="btns rt-14 left">
            <button id="menu-btn" className="btn-menu right rt-pointer rt-50px rt-23 rt-999">
              <i className="fa fa-bars"></i>
            </button>
            <Link href="/login" className={`btn rt-color rt-fff  ${session?.user.name ? 'user-panel':''} rt-5px rt-400 left`}>
              <i className="fa fa-user-o right"></i> ورود و ثبت نام
            </Link>
          
            <Link href="/cart" className="btn mini-btn rt-555 rt-5px rt-400 rt-relative left">
              <i className="fa fa-shopping-basket right"></i>
              <span className="rt-color rt-fff rt-15px rt-absolute rt-13 rt-align">0</span>
            </Link>
            <a href="#" className="btn mini-btn rt-555 rt-5px rt-400 left">
              <i className="fa fa-info-circle right"></i>
            </a>
            <span id="search-btn" className="btn mini-btn rt-555 search-btn rt-5px rt-400 left">
              <i className="fa fa-search right"></i>
            </span>
          </div>

          <div className="list rt">
            <div className="right rt-relative categorys">
              <span className="right rt-14 rt-pointer rt-666 rt-medium btn">
                <i className="fa fa-bars right"></i> دسته بندی ها
              </span>
              <div className="entery rt rt-absolute">
                <ul className="category rt rt-bg rt-14 rt-20px">
                  {categories?.map((category) => (
                    <li key={category.id} className="rt rt-relative rt-30px">
                      <a href={`/sub-categories/${category.id}`} className="right rt-777 rt-medium">
                        <i className="fa fa-folder rt-999"></i>
                        {category.name}
                      </a>
                      <i className="fa fa-angle-left left rt-666"></i>
                      <ul className="right rt-bg rt-20px rt-absolute rt-13">{category?.subCategories?.map((sub) => <CategoryListItem key={sub.id} subCategory={sub} />)}</ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <ul className="menu right rt-14">
              <li className="right">
                <Link href="/products" className="rt-666 rt-medium right">
                  تمام محصولات
                </Link>
              </li>
              <li className="right">
                <Link href="/blog" className="rt-666 rt-medium right">
                  وبلاگ
                </Link>
              </li>
              <li className="right">
                <Link href="/about" className="rt-666 rt-medium right">
                  درباره ما
                </Link>
              </li>
              <li className="right">
                <Link href="/contact" className="rt-666 rt-medium right">
                  ارتباط با ما
                </Link>
              </li>
            </ul>
            <a href="#" className="offers left rt-14 rt-555">
              <div className="icon rt-18 right rt-center">
                <i className="fa fa-ticket"></i>
              </div>{' '}
              تخفیف های شگفت انگیز
            </a>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
        
 
      
      <FooterComponent />

      <div id="close-menu-bg" className="rt"></div>
      <div id="mob-menu" className="mob-menu rt-bg right">
        <div className="logo rt rt-align">
          <Link href="/" className="rt">
            <Image src="/image/logo.png" alt="logo" className="right" width={100} height={35} />
          </Link>
        </div>
        <ul className="menu rt-14 rt" id="accordionb">
          <li className="thatlinkx">
            <Link href="/" className="rt-medium">
              <i className="fa fa-home rt-999 right icon"></i> صفحه اصلی
            </Link>
          </li>
          <li className="thatlinkx">
            <Link href="/products" className="rt-medium">
              <i className="fa fa-inbox rt-999 right icon"></i> تمام محصولات
            </Link>
          </li>
          <li className="thatlinkx">
            <Link href="/blog" className="rt-medium">
              <i className="fa fa-file-text-o rt-999 right icon"></i> وبلاگ
            </Link>
          </li>
          <li className="thatlinkx">
            <Link href="/about" className="rt-medium">
              <i className="fa fa-info-circle rt-999 right icon"></i> درباره ما
            </Link>
          </li>
          <li className="thatlinkx">
            <Link href="/contact" className="rt-medium">
              <i className="fa fa-envelope-o rt-999 right icon"></i> تماس با ما
            </Link>
          </li>
          <div className="rt thr"></div>

          <div className="rt rt-bold rt-15 title rt-333">دسته بندی محصولات</div>

          <li>
            <a href="#" className="rt rt-absolute thislinksz"></a>
            <span className="link rt rt-pointer rt-medium">محصولات تخفیف خورده</span>
          </li>

          {categories?.map((cat) => (
            <li key={cat.id}>
              <span className="link rt rt-pointer">
                {cat.name}
                <i className="fa fa-angle-down"></i>
              </span>
              <ul className="submenu">
                {/* <li>
                  <a href="#">
                    مشاهده همه موارد این دسته <i className="fa fa-angle-left"></i>
                  </a>
                </li> */}
                {cat.subCategories?.map((sub) => (
                  <li key={sub.id}>
                    <Link href={`/products?cat=${sub.id}`}>{sub.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <Script async src="/js/jquery.js" />
      <Script async src="/js/owl.carousel.js" />
      <Script async src="/js/java.js" />
    </>
  );
}
