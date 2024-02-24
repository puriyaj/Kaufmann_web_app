'use client';

import { CDN_URI, MAX_FILE_SIZE, UPLOAD_URL } from '@utils/constants';
import classNames from 'classnames';
import Image from 'next/image';
import SvgDelete from '@public/image/icon/delete.svg';
import PngNoImg from '@public/image/no-img.jpeg';
import React, { useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SvgLoading from 'public/image/icon/SvgLoading.svg';

interface Props {
  placeholder?: string;
  error?: string;
  filename?: string | null;
  onUpload: (filename: string | undefined) => void;
  onRemove?: () => void;
  containerClassName?: string;
  path: 'category' | 'product';
  accept?: string;
}

export const FileUploader: React.FC<Props> = (props) => {
  const { onUpload, onRemove, filename, placeholder, error, containerClassName, accept = 'image/*' } = props;
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const image = useMemo(() => filename, [filename]);

  const clearSelectedFile = () => {
    if (!inputRef.current) return;
    inputRef.current.value == '';
    onUpload(undefined);
    onRemove && onRemove();
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
          const response = await res.json();
          onUpload(response.source);
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
      className={classNames('flex flex-row border border-gray-200 rounded-lg overflow-hidden cursor-pointer w-min', error && '!border-red-600', containerClassName)}
      onClick={(ev) => {
        ev.stopPropagation();
        inputRef.current?.click();
      }}
    >
      <input type="file" ref={inputRef} className="hidden" onChange={handleFileChange} accept={accept} />
      {uploading ? (
        <div className="p-2">
          <SvgLoading className="w-6 h-6" />
        </div>
      ) : (
        <div className="w-10 h-10 relative">
          <Image src={image ? `${CDN_URI}/${image}` : PngNoImg} alt="" sizes="auto auto" fill />
        </div>
      )}

      {placeholder && (
        <div className={classNames(`flex-1 flex items-center flex-row duration-300 relative hover:bg-gray-50`)}>
          <p className={classNames('py-1 px-2 text-gray-500 whitespace-nowrap overflow-clip max-w-xs text-sm', error && '!text-red-600')}>
            {uploading && `در حال بارگزاری ...`}
            {!uploading && (
              <>
                {placeholder}
                {filename ? ': ' + filename : ''}
              </>
            )}
          </p>
        </div>
      )}

      {image && (
        <button
          type="button"
          className="bg-gray-100 hover:bg-red-200 w-10 h-10 border-none outline-none flex items-center justify-center"
          onClick={(ev) => {
            ev.stopPropagation();
            clearSelectedFile();
          }}
        >
          <SvgDelete className="w-5 h-5 text-red-600" />
        </button>
      )}
    </div>
  );
};
