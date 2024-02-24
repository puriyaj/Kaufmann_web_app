import SvgWarning from '@public/image/icon/warning.svg';
import React from 'react';
import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';

type Props = {
  isOpen: boolean;
  message?: React.ReactNode;
  onDelete?: () => void;
  onDismiss: () => void;
};

export const DeleteConfirmation: React.FC<Props> = (props) => {
  if (typeof props.isOpen == 'undefined') return null;

  return (
    <Modal open={props.isOpen ? true : false} title="هشدار" onDismis={props.onDismiss ? props.onDismiss : () => {}}>
      <div className="md:min-w-md">
        {!props.message && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 p-4">
            <div className="col-span-2 text-center flex flex-col justify-center items-center">
              <SvgWarning className="w-10 h-10 mb-4 text-orange-400" />
              <small className="mb-3">آیا از حذف اطلاعات مورد نظر مطمئن هستید ؟</small>
            </div>
          </div>
        )}
        {props.message && (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 p-4">
            <div className="col-span-2 text-center flex flex-col justify-center items-center">
              <small className="mb-3">{props.message}</small>
            </div>
          </div>
        )}

        <div className="flex justify-center items-center p-4">
          <Button type="button" outline color="light" className="w-36 me-4" onClick={props.onDismiss}>
            لغو
          </Button>
          <Button type="submit" color="info" className="w-36" onClick={() => (props.onDelete ? props.onDelete() : () => {})}>
            بله
          </Button>
        </div>
      </div>
    </Modal>
  );
};
