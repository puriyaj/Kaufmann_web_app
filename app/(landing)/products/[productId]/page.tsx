import { IPageProps } from 'types/page';
import React from 'react';
import { ProductInfoTabs } from './product-info-tabs';
import { notFound } from 'next/navigation';
import { productInfo } from 'actions/product.action';
import Link from 'next/link';
import Image from 'next/image';
import { getPrice } from '@utils/utils';
import { ProductImages } from './product-images';
import { ProductStock } from './product-stock';

export const dynamic = 'force-dynamic';

export default async function page({ params }: IPageProps<{ productId: string }>) {
  const product = await productInfo(params.productId);
  if (!product) return notFound();
  const stock = product?.stocks?.at(0);
  return (
    <div className="single-product rt">
      {/* <script type="text/javascript" src="js/vanilla-zoom.js"></script>
        <script type="text/javascript">vanillaZoom.init('#my-gallery');</script> */}
      <div className="main">
        <div className="location rt-bg rt-overflow rt">
          <a href="/" className="home rt-center rt-21 rt-555">
            <i className="fa fa-home"></i>
          </a>
          <div className="inside left rt-14 rt-555">
            <Link href="/">Home</Link> / <Link href={`/products?cat=${product?.subCategory?.id}`}>{product?.subCategory?.name}</Link> / {product?.name}
          </div>
        </div>
        <section className="top-product rt-bg rt-overflow rt">
          <div className="right-side right">
            <ProductImages images={product.images} />
            <span className="notic rt rt-5px rt-15 rt-bold">
              <i className="fa fa-hourglass-start">Deliver in 3 days</i>  
            </span>
          </div>
          <div className="left-side left rt-relative">
            {stock && stock?.discount > 0 && <span className="darsad rt-absolute rt-center rt-18 rt-bold rt-fff rt-color">{stock.discount}%</span>}
            <h1 className="title rt rt-18 rt-medium">{product.name}</h1>
            <p className="des rt rt-14 rt-999">{product.subCategory?.name}</p>
            <div className="share left rt-absolute">
              <span className="left rt-align rt-pointer rt-999" id="social-share-btn">
                <i className="fa fa-share-alt left"></i>
              </span>
              <div id="social-share" className="right rt-bg rt-absolute">
                <a className="left rt-center rt-fff rt-50px fb" href="#" rel="nofollow" target="_blank">
                  <i className="fa fa-facebook-f"></i>
                </a>
                <a className="left rt-center rt-fff rt-50px gp" href="#" rel="nofollow" target="_blank">
                  <i className="fa fa-google-plus"></i>
                </a>
                <a className="left rt-center rt-fff rt-50px tw" href="#" rel="nofollow" target="_blank">
                  <i className="fa fa-twitter"></i>
                </a>
                <a className="left rt-center rt-fff rt-50px wa" href="#" rel="nofollow" target="_blank">
                  <i className="fa fa fa-whatsapp"></i>
                </a>
                <a className="left rt-center rt-fff rt-50px tg" href="#" target="_blank">
                  <i className="fa fa-paper-plane"></i>
                </a>
              </div>
            </div>
            <div className="side right">
              <h4 className="rt rt-15 rt-400 rt-relative">About Product</h4>
              <ul className="rt rt-999 rt-13">
                <li className="rt">
                  <i className="fa fa-circle">size</i>  <span className="rt-400">40*26*49</span>
                </li>
                <li className="rt">
                  <i className="fa fa-circle">Material</i>   <span className="rt-400">Titanium</span>
                </li>
                <li className="rt">
                  <i className="fa fa-circle">Glass</i>   <span className="rt-400">Protected</span>
                </li>
                <li className="rt">
                  <i className="fa fa-circle">weight</i>  <span className="rt-400">230 gr</span>
                </li>
              </ul>
              <span className="suspend rt rt-13">
                <i className="fa fa-car">This Product has 2 Years Garantie</i>
              </span>
              <div className="cat-p rt-14 right rt-5px">
                <i className="fa fa-list-ul">Categoty :</i>    <Link href={`/products?cat=${product?.subCategory?.id}`}>{product?.subCategory?.name}</Link>
              </div>
            </div>
            <ProductStock product={product} />
            <div className="features text-center rt-align rt">
              <div className="item right rt-bg">
                <Image alt="" className="mx-auto" width={50} height={50} src="/image/icon-1.png" />
                <h4 className="rt rt-400 rt-666 rt-14">Money Back Garantie</h4>
              </div>
              <div className="item right rt-bg">
                <Image alt="" className="mx-auto" width={50} height={50} src="/image/icon-2.png" />
                <h4 className="rt rt-400 rt-666 rt-14">Cheap</h4>
              </div>
              <div className="item right rt-bg">
                <Image alt="" className="mx-auto" width={50} height={50} src="/image/icon-3.png" />
                <h4 className="rt rt-400 rt-666 rt-14">Free Delivery  </h4>
              </div>
              <div className="item right rt-bg">
                <Image alt="" className="mx-auto" width={50} height={50} src="/image/icon-4.png" />
                <h4 className="rt rt-400 rt-666 rt-14">  Technical Check</h4>
              </div>
              <div className="item right rt-bg">
                <Image alt="" className="mx-auto" width={50} height={50} src="/image/icon-5.png" />
                <h4 className="rt rt-400 rt-666 rt-14">Safe Pay</h4>
              </div>
            </div>
          </div>
        </section>
        <ProductInfoTabs product={product} />
      </div>
    </div>
  );
}
