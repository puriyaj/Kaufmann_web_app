'use client';

import XIcon from '@public/image/icon/x.svg';
import { useAction } from '@utils/hooks/action';
import classNames from 'classnames';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from '../icon-button/IconButton';

type ModalProps = {
  open?: boolean;
  modalPosition?: 'top' | 'bottom' | 'fullHeight';
  isChildModal?: boolean;
  containerStyle?: string;
  headerClassName?: string;
  wrapperStyle?: string;
  headerRight?: React.ReactNode;
  title?: React.ReactNode;
  headerLeft?: React.ReactNode;
  closeButton?: boolean;
  loading?: boolean;
  onDismis?: () => void;
  width?: number;
};

export type PropsWithDismiss<P = unknown> = P & { onDismiss: () => void };

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ open = true, children, loading, width, onDismis, headerClassName, ...props }) => {
  const [mounted, setMounted] = useState(false);
  const { closeModal } = useAction();

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // closeModal()
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) return null;

  if (mounted) {
    return createPortal(
      <div
        className={`fixed z-60 right-0 left-0 top-0 bottom-0 flex justify-center items-center  ${props.containerStyle}`}
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        onClick={() => {}}
      >
        <div className="bg-white rounded-lg min-w-sm  shadow-xl" style={{ width: width }}>
          <header className={classNames('grid grid-cols-3 items-center botder-b rounded-t-lg text-white py-1 bg-blue-500', headerClassName)}>
            <div className="px-4">{props.headerRight}</div>
            <h3 className="text-center text-xs font-semibold pointer-events-none cursor-default">{props.title}</h3>
            <div className="text-end">
              {props.headerLeft}
              <IconButton
                Size="xs"
                icon={XIcon}
                iconStyle="fill-white"
                className="cursor-pointer text-gray-100 hover:bg-transparent hover:text-white"
                onClick={() => {
                  closeModal && closeModal();
                  onDismis && onDismis();
                }}
              />
            </div>
          </header>
          <main className="relative">
            {loading && (
              <div
                className="absolute left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center rounded-b-lg filter backdrop-blur-sm print:hidden"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
              >
                <div className="inline-flex flex-col items-center justify-center">
                  {/* <SvgLoading className="w-14 mb-3" /> */}
                  <span>لطفا صبر کنید</span>
                </div>
              </div>
            )}
            {children}
          </main>
        </div>
      </div>,
      document.getElementById('modal_root') as Element
    );
  } else {
    return null;
  }
};
