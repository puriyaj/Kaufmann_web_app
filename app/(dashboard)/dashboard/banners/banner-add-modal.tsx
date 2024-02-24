'use client';
import { ActivationStatusSelector } from '@cmp/activation-status-selector';
import { BannerPositionSelector } from '@cmp/banner-position-selector';
import Modal from '@cmp/modal';
import { ImageUploader } from '@cmp/ui/image-uploader';
import { ACTIVATION_STATUS, BANNER_POSITION, Banner } from '@prisma/client';
import { Button, InputBox, ToggleSwitch } from '@ui';
import { REQUIRED_MESSAGE } from '@utils/constants';
import { handleError } from '@utils/err-handler';
import { createBanner, updateBanner } from 'actions/banner.action';
import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { CreateBanner, UpdateBanner } from 'requests/banner.dto';

type ModalContentProps = {
  closeModal: () => void;
  info?: Banner;
};
type FormInput = CreateBanner & UpdateBanner;

const ModalContent: React.FC<ModalContentProps> = ({ closeModal, info }) => {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, setValue, reset, watch } = useForm<FormInput>({ defaultValues: { status: ACTIVATION_STATUS.PENDING, position: BANNER_POSITION.SLIDER } });

  useEffect(() => {
    if (!info) return;
    reset(info);
  }, [info, reset]);

  const onSubmit = async (data: FormInput) => {
    startTransition(async () => {
      try {
        if (info?.id) {
          const res = await updateBanner(data);
        } else {
          createBanner(data);
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
        <div className="p-2 grid grid-cols-2 gap-2">
          <InputBox control={control} name="title" rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} placeholder="Title" />
          <InputBox control={control} name="link" rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} placeholder="Link" />
          <ActivationStatusSelector control={control} name="status" rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} />
          <BannerPositionSelector control={control} name="position" rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} />
          <ImageUploader
            path="human-avatar"
            containerClassName="col-span-2"
            imageClassName="w-100 h-50"
            placeholder="آپلود بنر"
            filename={watch('image')}
            onUpload={(fn) => setValue('image', fn as string)}
          />

          {/* <ImageUploader path="human-avatar" containerClassName="" placeholder="آپلود عکس" filename={watch("image")} onUpload={(fn) => setValue("image", fn ?? "")} /> */}
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

export const useBannerAddModal = () => {
  const [showModal, setShowModal] = useState<any>();

  const ModalCMP = useCallback(() => {
    return (
      <Modal title={'Banner Form'} showModal={!!showModal} setShowModal={setShowModal}>
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
