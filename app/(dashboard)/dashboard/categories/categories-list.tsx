'use client';
import { Button, Table, TableHead } from '@cmp/ui';
import React, { useMemo } from 'react';
import Image from 'next/image';
import { ActionButton } from '@cmp/action-button';
import moment from 'moment-jalaali';
import { useCategoryAddModal } from './category-add-modal';
import { deleteCategory } from 'actions/category.action';
import { handleError } from '@utils/err-handler';
import { toast } from 'react-toastify';
import { DELETE_MSG, boolean_details } from '@utils/constants';
import { Badge } from '@cmp/ui/components/badge';
import { Paginated } from 'types/page';
import { Category } from '../../../../prisma/generated/client';
import { useRouter } from 'next/navigation';
import { useConfirmation } from '@utils/hooks/confirmation.provider';

type Props = {
  categories: Paginated<Category>;
};

export const CategoriesList: React.FC<Props> = ({ categories }) => {
  const { ModalCMP, openModal } = useCategoryAddModal();
  const router = useRouter();
  const { deleteConfirmation } = useConfirmation();
  const list = useMemo(
    () =>
      categories?.data.map((item, idx) => ({
        id: item.id,
        rowsNum: idx + 1,
        name: item.name,
        isMain: <Badge color={boolean_details[item.isMain ? 1 : 0]?.color}>{boolean_details[item.isMain ? 1 : 0]?.faName}</Badge>,
        image: item.image ?? '--',
        createdAt: moment(item.createdAt).format('YYYY/MM/DD'),
        action: (
          <div className="flex justify-end gap-1">
            <ActionButton type="see" onClick={() => router.push(`/dashboard/sub-categories?cat=${item.id}`)} />
            <ActionButton type="edit" onClick={() => openModal(item)} />
            <ActionButton
              type="delete"
              onClick={() => {
                deleteConfirmation(item, () => {
                  deleteCategory({ id: item.id }).then((res) => {
                    toast.warning(DELETE_MSG);
                  });
                });
              }}
            />
          </div>
        ),
      })),
    [categories, deleteConfirmation, openModal, router]
  );

  return (
    <div className=" bg-white rounded-lg p-4">
      <header className="grid items-center grid-cols-3">
        <div>{/* <SearchBox /> */}</div>
        <h1 className="text-lg font-bold text-center">Categories List</h1>
        <div className="flex justify-end">
          <Button type="button" onClick={() => openModal(true)}>
            New
          </Button>
        </div>
      </header>
      <div className="mt-4">
        <Table loading={false} tableHead={tableHeads} size="sm" data={list ?? []} paginationType="numbering" pagination={categories} />
      </div>
      <ModalCMP />
    </div>
  );
};

const tableHeads: TableHead[] = [
  { id: 'rowsNum', name: '#', dataAlign: 'center', minWidth: true },
  { id: 'name', name: 'Name', dataAlign: 'center' },
  { id: 'image', name: 'Image', dataAlign: 'center' },
  { id: 'createdAt', name: 'Created At', dataAlign: 'center' },
  { id: 'isMain', name: 'Main', dataAlign: 'center' },
  { id: 'action', name: 'Actions', dataAlign: 'end' },
];
