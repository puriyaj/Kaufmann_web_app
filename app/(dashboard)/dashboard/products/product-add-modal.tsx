'use client';
import { ActionButton } from '@cmp/action-button';
import { ActivationStatusSelector } from '@cmp/activation-status-selector';
import Modal from '@cmp/modal';
import { SubCategorySelector } from '@cmp/sub-category-selector';
import { FileUploader } from '@cmp/ui/FileUploader';
import { ImageUploader } from '@cmp/ui/image-uploader';
import { ACTIVATION_STATUS } from '../../../../prisma/generated/client';
import { Button, InputBox, ToggleSwitch } from '@ui';
import { CDN_URI, REQUIRED_MESSAGE } from '@utils/constants';
import { handleError } from '@utils/err-handler';
import { createProduct, updateProduct } from 'actions/product.action';
import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { CreateProduct, UpdateProduct } from 'requests/product.dto';
import { ProductWithCategoryAndStock } from 'types/types';
import Image from 'next/image';
import PngNoImg from '@public/image/no-img.jpeg';

type ModalContentProps = {
  closeModal: () => void;
  info?: ProductWithCategoryAndStock;
};
type FormInput = CreateProduct & UpdateProduct & { subCategory: { id: string; name: string }; items: { url: string } };

const ModalContent: React.FC<ModalContentProps> = ({ closeModal, info }) => {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, reset, register, watch, setValue } = useForm<FormInput>({ defaultValues: { status: ACTIVATION_STATUS.PENDING } });
  const { fields, append, remove, update } = useFieldArray({ control, name: 'images' as never, keyName: 'key' });
  useEffect(() => {
    if (!info) return;
    reset({
      id: info.id,
      images: info.images ?? undefined,
      isMain: info.isMain ?? undefined,
      name: info.name,
      subCategoryId: info.subCategoryId,
      description: info.description ?? '',
      isActive: info.isActive,
      status: info.status,
      subCategory: info.subCategory,
    });
  }, [info, reset]);

  const onSubmit = async (data: FormInput) => {
    startTransition(async () => {
      try {
        if (info?.id) {
          const res = await updateProduct(data);
        } else {
          const res = await createProduct(data);
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
        <div className="p-2 grid grid-cols-4 gap-3">
          <InputBox control={control} name="name" containerClassName="col-span-3" rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} placeholder="Name" />
          <ActivationStatusSelector control={control} name="status" rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} />
          <SubCategorySelector control={control} name="subCategory" containerClassName="col-span-2" rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} />
          <ToggleSwitch
            name="isMain"
            checked={watch('isMain') ?? false}
            label={'Main'}
            onChange={(ev) => {
              setValue('isMain', ev);
            }}
          />
          <ToggleSwitch
            name="isActive"
            checked={watch('isActive') ?? false}
            label={'Active'}
            onChange={(ev) => {
              setValue('isActive', ev);
            }}
          />

          <div className="py-1 col-span-4 flex flex-col gap-1">
            {fields.map((it, idx) => (
              <div key={it.key} className="flex gap-1 w-full">
                <div className="flex items-center gap-2 col-span-1">{/* <ActionButton type="delete" onClick={() => remove(idx)} /> */}</div>
                <FileUploader
                  path="product"
                  placeholder="بارگزاری فایل"
                  filename={watch(`images.${idx}`)}
                  onUpload={(fn) => {
                    setValue(`images.${idx}`, fn ?? '');
                    update(idx, fn);
                  }}
                  containerClassName="!w-full text-center"
                />
              </div>
            ))}
            <div className="flex justify-center">
              <ActionButton type="add" label="بارگزاری عکس بیشتر" onClick={() => append(undefined)} />
            </div>
          </div>

          <textarea {...register('description')} rows={3} placeholder="Description" className="border col-span-4 text-sm rounded-lg p-2" />
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

export const useProductAddModal = () => {
  const [showModal, setShowModal] = useState<any>();

  const ModalCMP = useCallback(() => {
    return (
      <Modal title={'Product Form'} showModal={!!showModal} setShowModal={setShowModal}>
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
