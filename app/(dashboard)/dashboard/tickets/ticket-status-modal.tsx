'use client';
import { ActivationStatusSelector } from '@cmp/activation-status-selector';
import Modal from '@cmp/modal';
import { Ticket } from '../../../../prisma/generated/client';
import { Button } from '@ui';
import { REQUIRED_MESSAGE } from '@utils/constants';
import { handleError } from '@utils/err-handler';
import { updateTicketStatus } from 'actions/ticket.action';
import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateTicketStatus } from 'requests/ticket.dto';

type ModalContentProps = {
  closeModal: () => void;
  info?: Ticket;
};
type FormInput = UpdateTicketStatus;

const ModalContent: React.FC<ModalContentProps> = ({ closeModal, info }) => {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, reset } = useForm<FormInput>();

  useEffect(() => {
    if (!info) return;
    reset({ id: info.id, status: info.status });
  }, [info, reset]);

  const onSubmit = async (data: FormInput) => {
    startTransition(async () => {
      try {
        if (!info) return;
        const res = await updateTicketStatus(data);
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
          <ActivationStatusSelector control={control} name="status" rules={{ required: { value: true, message: REQUIRED_MESSAGE } }} />
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

export const useTicketStatusModal = () => {
  const [showModal, setShowModal] = useState<any>();

  const ModalCMP = useCallback(() => {
    return (
      <Modal title={'Ticket Form'} showModal={!!showModal} setShowModal={setShowModal}>
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
