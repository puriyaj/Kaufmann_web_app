'use client';
import { Button, Table, TableHead } from '@cmp/ui';
import React, { useMemo } from 'react';
import Image from 'next/image';
import { ActionButton } from '@cmp/action-button';
import { Banner } from '@prisma/client';
import moment from 'moment-jalaali';
import { handleError } from '@utils/err-handler';
import { toast } from 'react-toastify';
import { deleteBanner } from 'actions/banner.action';
import { useBannerAddModal } from './banner-add-modal';
import { DELETE_MSG, activation_status_details, banner_position_details } from '@utils/constants';
import { Badge } from '@cmp/ui/components/badge';
import { useConfirmation } from '@utils/hooks/confirmation.provider';

type Props = {
  banners: Banner[];
};

export const BannersList: React.FC<Props> = ({ banners }) => {
  const { ModalCMP, openModal } = useBannerAddModal();
  const { deleteConfirmation } = useConfirmation();
  const list = useMemo(
    () =>
      banners?.map((item, idx) => ({
        id: item.id,
        rowsNum: idx + 1,
        title: item.title,
        position: banner_position_details[item.position]?.faName,
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
        <h1 className="text-lg font-bold text-center">Banners List</h1>
        <div className="flex justify-end">
          <Button type="button" onClick={() => openModal(true)}>
            New
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
  { id: 'title', name: 'Title', dataAlign: 'center' },
  { id: 'position', name: 'Position', dataAlign: 'center' },
  { id: 'link', name: 'Link', dataAlign: 'center' },
  { id: 'image', name: 'Image', dataAlign: 'center' },
  { id: 'createdAt', name: 'Created At', dataAlign: 'center' },
  { id: 'status', name: 'Status', dataAlign: 'center' },
  { id: 'action', name: 'Actions', dataAlign: 'end' },
];
