'use client';
import { CategorySelector } from '@cmp/category-selector';
import Modal from '@cmp/modal';
import { ImageUploader } from '@cmp/ui/image-uploader';
import { SubCategory } from '@prisma/client';
import { Button, InputBox, ToggleSwitch } from '@ui';
import { REQUIRED_MESSAGE } from '@utils/constants';
import { handleError } from '@utils/err-handler';
import { createSubCategory, updateSubCategory } from 'actions/sub-category.action';
import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CreateSubCategory, UpdateSubCategory } from 'requests/sub-category.dto';
import { SubCategoryWithParent } from 'types/types';

type ModalContentProps = {
  closeModal: () => void;
  info?: SubCategoryWithParent;
};
type FormInput = CreateSubCategory & UpdateSubCategory & { category: { id: string; name: string } };

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
      categoryId: info.categoryId,
      category: {
        id: info.category?.id,
        name: info.category?.name,
      },
    });
  }, [info, reset]);

  const onSubmit = async (data: FormInput) => {
    startTransition(async () => {
      try {
        if (info?.id) {
          const res = await updateSubCategory(data);
        } else {
          createSubCategory(data);
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
        <div className="p-4 flex flex-col gap-3">
          <InputBox control={control} name="name" rules={{ required: REQUIRED_MESSAGE }} placeholder="Name" />
          <CategorySelector control={control} name="category" rules={{ required: REQUIRED_MESSAGE }} />

          {/* <InputBox control={control} name="image" placeholder="Image Link" /> */}
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

export const useSubCategoryAddModal = () => {
  const [showModal, setShowModal] = useState<any>();

  const ModalCMP = useCallback(() => {
    return (
      <Modal title={'Sub Category Form'} showModal={!!showModal} setShowModal={setShowModal}>
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
