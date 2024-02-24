'use client';

import { CDN_URI, MAX_FILE_SIZE, UPLOAD_URL } from '@utils/constants';
import classNames from 'classnames';
import Image from 'next/image';
import SvgDelete from 'public/image/icon/delete.svg';
import PngNoImg from 'public/image/no-img.jpeg';
import React, { useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from './components';

interface Props {
  placeholder: string;
  error?: string;
  filename?: string | null;
  onUpload?: (filename: string | undefined) => void;
  containerClassName?: string;
  imageClassName?: string;
  path: string;
}

export const ImageUploader: React.FC<Props> = (props) => {
  const { onUpload, filename, placeholder, error, containerClassName, imageClassName } = props;
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const image = useMemo(() => filename, [filename]);

  const clearSelectedFile = () => {
    if (!inputRef.current) return;
    inputRef.current.value == '';
    onUpload && onUpload(undefined);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file.size > MAX_FILE_SIZE) {
      if (!inputRef.current) return;
      inputRef.current.value = '';
      toast.error(`حجم فایل نمیتواند بیشتر ${Math.round(MAX_FILE_SIZE / 1000000)} مگابایت باشد`);
      return;
    }

    const fd = new FormData();
    fd.append('file', file);
    fd.append('path', props.path);

    setUploading(true);

    fetch(UPLOAD_URL, {
      method: 'post',
      body: fd,
      headers: {
        Accept: 'application/json',
      },
    })
      .then(async (res) => {
        if (res.ok) {
          // const response = await res.text();
          const response = await res.json();
          onUpload && onUpload(response.source);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      })
      .finally(() => {
        inputRef.current!.value = '';
        setUploading(false);
      });
  };

  return (
    <div
      className={classNames(
        'relative w-full border border-gray-200 rounded-lg overflow-hidden hover:shadow hover:!bg-white cursor-pointer',
        error && '!border-red-600',
        containerClassName
      )}
      onClick={(ev) => {
        ev.stopPropagation();
        inputRef.current?.click();
      }}
    >
      <div className={classNames('w-48 h-48 mx-auto relative ', imageClassName)}>
        {uploading ? <Spinner className="flex items-center mx-auto h-full" size="xl" /> : <Image src={image ? `${CDN_URI}/${image}` : PngNoImg} alt="" sizes="auto auto" fill />}
      </div>
      <input type="file" placeholder={placeholder} ref={inputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
      {/* <p className={classNames('absolute top-0 py-1 px-2 text-gray-500 whitespace-nowrap overflow-clip max-w-xs text-sm', error && '!text-red-600')}>
        {uploading && <Spinner className="mx-auto" size="lg" />}
      </p> */}
      {/* {image && (
        <button type="button" className="absolute bg-gray-100 hover:bg-red-200 w-10 h-10 border-none outline-none flex items-center justify-center" onClick={clearSelectedFile}>
          <SvgDelete className="w-5 h-5 text-red-600" />
        </button>
      )} */}
    </div>
  );
};
