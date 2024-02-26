import { BANNER_POSITION, Banner } from '../../../prisma/generated/client';
import React from 'react';
import Image from 'next/image';
import { CDN_URI } from '@utils/constants';
import Link from 'next/link';

export const Banners: React.FC<{ banners?: Banner[] }> = ({ banners }) => {
  const topLeft = banners?.find((it) => it.position == BANNER_POSITION.TOP_LEFT);
  const botLeft = banners?.find((it) => it.position == BANNER_POSITION.BOTTOM_LEFT);
  const sliders = banners?.filter((it) => it.position == BANNER_POSITION.SLIDER);
  return (
    <aside className="banners rt">
      <div className="main">
        {sliders && sliders.length > 0 && (
          <div className="owl-carousel slider-1 rt-relative rt-overflow rt-5px right">
            {sliders?.map((slider, idx) => (
              <div key={idx} className="item rt">
                <Link href={slider.link} className="rt">
                  <Image width={800} height={400} src={`${CDN_URI}/${slider.image}`} alt={slider.title} className="rt rt-5px" />
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="side left">
          {topLeft && (
            <Link href={topLeft?.link} className="rt-banner-2 rt">
              <Image src={`${CDN_URI}/${topLeft?.image}`} width={400} height={200} alt={topLeft?.title ?? ''} className="rt rt-5px" />
            </Link>
          )}
          {botLeft && (
            <Link href={botLeft?.link} className="rt-banner-3 rt">
              <Image src={`${CDN_URI}/${botLeft?.image}`} width={400} height={200} alt={botLeft?.title ?? ''} className="rt rt-5px" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
};
