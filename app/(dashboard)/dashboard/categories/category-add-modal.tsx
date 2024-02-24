'use client';
import { CategorySelector } from '@cmp/category-selector';
import Modal from '@cmp/modal';
import { ImageUploader } from '@cmp/ui/image-uploader';
import { Category } from '@prisma/client';
import { Button, InputBox, ToggleSwitch } from '@ui';
import { REQUIRED_MESSAGE } from '@utils/constants';
import { handleError } from '@utils/err-handler';
import { createCategory, updateCategory } from 'actions/category.action';
import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { CreateCategory, UpdateCategory } from 'requests/category.dto';

type ModalContentProps = {
  closeModal: () => void;
  info?: Category;
};
type FormInput = CreateCategory & UpdateCategory;

const ModalContent: React.FC<ModalContentProps> = ({ closeModal, info }) => {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, reset, watch, setValue } = useForm<FormInput>();

  useEffect(() => {
    if (!info) return;
    reset({
      id: info.id,
      image: info.image ?? undefined,
      isMain: info.isMain ?? undefined,
      name: info.name,
    });
  }, [info, reset]);

  const onSubmit = async (data: FormInput) => {
    startTransition(async () => {
      try {
        if (info?.id) {
          const res = await updateCategory(data);
        } else {
          const res = await createCategory(data);
        }
      } catch (err) {
        handleError(err);
      } finally {
        closeModal();
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 flex flex-col gap-3">
          <InputBox control={control} name="name" placeholder="Name" rules={{ required: REQUIRED_MESSAGE }} />

          <ImageUploader path="human-avatar" containerClassName="" placeholder="آپلود عکس" filename={watch('image')} onUpload={(fn) => setValue('image', fn)} />
          <ToggleSwitch
            name="isMain"
            checked={watch('isMain') ?? false}
            label={'Is Main'}
            onChange={(ev) => {
              setValue('isMain', ev);
            }}
          />
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

export const useCategoryAddModal = () => {
  const [showModal, setShowModal] = useState<any>();

  const ModalCMP = useCallback(() => {
    return (
      <Modal title={'Category Form'} showModal={!!showModal} setShowModal={setShowModal}>
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
