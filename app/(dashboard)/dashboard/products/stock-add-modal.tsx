'use client';
import Modal from '@cmp/modal';
import { CURRENCY_TYPE, Stock } from '@prisma/client';
import { REQUIRED_MESSAGE } from '@utils/constants';
import { Button, InputBox } from '@ui';
import { createStock } from 'actions/stock.action';
import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { CreateStock } from 'requests/stock.dto';
import { handleError } from '@utils/err-handler';

type ModalContentProps = {
  closeModal: () => void;
  info?: Stock;
};
type FormInput = CreateStock;

const ModalContent: React.FC<ModalContentProps> = ({ closeModal, info }) => {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, reset, register, watch, setValue } = useForm<FormInput>();

  useEffect(() => {
    if (!info) return;
    if (typeof info === 'string') {
      reset({ productId: info, currency: CURRENCY_TYPE.IRR });
      return;
    }
    reset({
      currency: info.currency,
      discount: info.discount,
      inStock: info.inStock,
      price: info.price,
      productId: info.productId,
    });
  }, [info, reset]);

  const onSubmit = async (data: FormInput) => {
    startTransition(async () => {
      try {
        if (info) {
          const res = await createStock({
            currency: data.currency,
            discount: Number(data.discount ?? 0),
            inStock: Number(data.inStock ?? 0),
            price: data.price,
            productId: data.productId,
          });
        }
      } catch (err) {
        handleError(err);
      } finally {
        closeModal();
      }
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 grid grid-cols-3 gap-3">
          <InputBox control={control} name="price" placeholder="Price" isCurrency rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} />
          <InputBox control={control} name="inStock" placeholder="In Stock" hideCurrenctyTag isNumric rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} />
          <InputBox control={control} name="discount" placeholder="Discount" hideCurrenctyTag isNumric rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} />
        </div>
        <div className="flex justify-start w-full gap-3 p-4 pt-0">
          <Button type="submit" loading={isPending}>
            Submit
          </Button>
          <Button type="button" onClick={closeModal} color="gray">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export const useStockAddModal = () => {
  const [showModal, setShowModal] = useState<any>();

  const ModalCMP = useCallback(() => {
    return (
      <Modal title={'Stock Form'} showModal={!!showModal} setShowModal={setShowModal}>
        <ModalContent closeModal={() => setShowModal(undefined)} info={typeof showModal != 'boolean' ? showModal : undefined} />
      </Modal>
    );
  }, [showModal]);

  return useMemo(
    () => ({
      openModal: setShowModal,
      ModalCMP,
    }),
    [ModalCMP]
  );
};
