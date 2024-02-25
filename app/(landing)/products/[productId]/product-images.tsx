'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { CDN_URI } from '@utils/constants';

export const ProductImages: React.FC<{ images: string[] }> = ({ images }) => {
  const [image, setImage] = useState<string>(images[0]);

  return (
    <div id="my-gallery" className="vanilla-zoom rt">
      <div className="sidebars right">
        {images.map((img, idx) => (
          <Image key={idx} src={`${CDN_URI}/${img}`} onClick={() => setImage(img)} alt="" width={20} height={20} className="small-preview" />
        ))}
      </div>
      <div className="zoomed-image ">
        <Image src={`${CDN_URI}/${image}`} alt="" width={500} height={500} className="small-preview" />
      </div>
    </div>
  );
};
