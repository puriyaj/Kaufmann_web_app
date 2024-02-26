'use client';
import { Button, Table, TableHead } from '@cmp/ui';
import React, { useMemo } from 'react';
import Image from 'next/image';
import { ActionButton } from '@cmp/action-button';
import { BANNER_POSITION, Banner } from '../../../../prisma/generated/client';
import moment from 'moment-jalaali';
import { handleError } from '@utils/err-handler';
import { toast } from 'react-toastify';
import { deleteBanner } from 'actions/banner.action';
import { useBannerAddModal } from './banner-add-modal';
import { DELETE_MSG, activation_status_details, banner_position_details } from '@utils/constants';
import { Badge } from '@cmp/ui/components/badge';
import { useConfirmation } from '@utils/hooks/confirmation.provider';
import { number } from 'yup';

type Props = {
  banners: Banner[];
};

export const BannersList: React.FC<Props> = ({ banners }) => {
  const { ModalCMP, openModal } = useBannerAddModal();
  const { deleteConfirmation } = useConfirmation();
  const list = useMemo(
    () =>
      banners?.map((item: Banner, idx) => ({
        id: item.id,
        rowsNum: idx + 1,
        title: item.title,
        position: banner_position_details[item.position]?.faName as string,
        status: <Badge color={activation_status_details[item.status]?.color}>{activation_status_details[item.status]?.faName}</Badge>,
        link: item.link,
        image: item.image ?? '--',
        createdAt: moment(item.createdAt).format('YYYY/MM/DD'),
        action: (
          <div className="flex justify-end gap-1">
            <ActionButton type="see" />
            <ActionButton type="edit" onClick={() => openModal(item)} />
            <ActionButton
              type="delete"
              onClick={() => {
                deleteConfirmation(item, () => {
                  deleteBanner({ id: item.id }).then((res) => {
                    toast.warning(DELETE_MSG);
                  });
                });
              }}
            />
          </div>
        ),
      })),
    [banners, deleteConfirmation, openModal]
  );

  return (
    <div className=" bg-white rounded-lg p-4">
      <header className="grid items-center grid-cols-3">
        <div>{/* <SearchBox /> */}</div>
        <h1 className="text-lg font-bold text-center">لیست بنرها</h1>
        <div className="flex justify-end">
          <Button type="button" onClick={() => openModal(true)}>
            جدید
          </Button>
        </div>
      </header>
      <div className="mt-4">
        <Table loading={false} tableHead={tableHeads} size="md" data={list ?? []} paginationType="numbering" />
      </div>
      <ModalCMP />
    </div>
  );
};

const tableHeads: TableHead[] = [
  { id: 'rowsNum', name: '#', dataAlign: 'center', minWidth: true },
  { id: 'title', name: 'عنوان', dataAlign: 'center' },
  { id: 'position', name: 'موقعیت', dataAlign: 'center' },
  { id: 'link', name: 'لینک', dataAlign: 'center' },
  { id: 'image', name: 'عکس', dataAlign: 'center' },
  { id: 'createdAt', name: 'تاریخ', dataAlign: 'center' },
  { id: 'status', name: 'وضعیت', dataAlign: 'center' },
  { id: 'action', name: '', dataAlign: 'end' },
];
