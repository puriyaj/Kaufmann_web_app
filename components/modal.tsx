'use client';
import * as Dialog from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { Drawer } from 'vaul';
import useMediaQuery from '@utils/hooks/use-media-query';

type Props = {
  children: React.ReactNode;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  className?: string;
  onClose?: () => void;
  preventDefaultClose?: boolean;
  title?: string;
  hideHeader?: boolean;
  loading?: boolean;
};
export default function Modal(props: Props) {
  const { children, showModal, setShowModal, className, onClose, preventDefaultClose, title, hideHeader } = props;
  const router = useRouter();

  const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
    if (preventDefaultClose && !dragged) {
      return;
    }
    // fire onClose event if provided
    onClose && onClose();

    // if setShowModal is defined, use it to close modal
    if (setShowModal) {
      setShowModal(false);
      // else, this is intercepting route @modal
    } else {
      router.back();
    }
  };
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer.Root
        open={setShowModal ? showModal : true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true });
          }
        }}
      >
        <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content className={classNames('fixed bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t border-gray-200 bg-white', className)}>
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
            </div>
            {children}
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
  return (
    <Dialog.Root
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay id="modal-backdrop" className="fixed inset-0 z-40 hidden animate-fade-in bg-gray-100 bg-opacity-50 md:block" />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className={classNames(
            'fixed inset-0 z-40 m-auto !h-min hidden max-h-fit w-full max-w-md animate-scale-in rounded-2xl border border-gray-200 bg-white p-0 shadow-xl md:block',
            className
          )}
        >
          {!hideHeader && (
            <header className="flex justify-between items-center py-2 px-4 border-b">
              <p className="pointer-events-none select-none">{title}</p>
              <button type="button" className="-ml-2 p-1 border-none hover:bg-gray-200 duration-300 rounded-lg" onClick={() => closeModal()}>
                {/* <X className="w-5 h-5" /> */}
              </button>
            </header>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
