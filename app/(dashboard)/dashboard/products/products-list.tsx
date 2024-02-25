'use client';
import { Button, Table, TableHead } from '@cmp/ui';
import React, { useMemo } from 'react';
import { ActionButton } from '@cmp/action-button';
import moment from 'moment-jalaali';
import { toast } from 'react-toastify';
import { useProductAddModal } from './product-add-modal';
import { DELETE_MSG, activation_status_details, boolean_details } from '@utils/constants';
import { Paginated } from 'types/page';
import { CategorySelector } from '@cmp/category-selector';
import { useForm } from 'react-hook-form';
import { searchQueryParam } from '@utils/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@cmp/ui/components/badge';
import { useStockAddModal } from './stock-add-modal';
import { ProductWithCategoryAndStock } from 'types/types';
import { SubCategorySelector } from '@cmp/sub-category-selector';
import { useConfirmation } from '@utils/hooks/confirmation.provider';
import { deleteProduct } from 'actions/product.action';

type Props = {
  products: Paginated<ProductWithCategoryAndStock>;
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const { ModalCMP, openModal } = useProductAddModal();
  const { ModalCMP: StockModalCMP, openModal: openStockModal } = useStockAddModal();
  const { deleteConfirmation } = useConfirmation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { control } = useForm();
  const list = useMemo(
    () =>
      products?.data?.map((item, idx) => ({
        id: item.id,
        rowsNum: idx + 1,
        name: item.name,
        category: item.subCategory.name,
        description: item.description,
        price: <Badge color="gray">{Number(item.stocks?.at(0)?.price ?? 0).toLocaleString()}</Badge>,
        inStock: item.stocks?.at(0)?.inStock,
        discount: item.stocks?.at(0)?.discount,
        createdAt: moment(item.createdAt).format('YYYY/MM/DD'),
        status: <Badge color={activation_status_details[item.status]?.color}>{activation_status_details[item.status]?.faName}</Badge>,
        isMain: <Badge color={boolean_details[item.isMain ? 1 : 0]?.color}>{boolean_details[item.isMain ? 1 : 0]?.faName}</Badge>,
        isActive: <Badge color={boolean_details[item.isActive ? 1 : 0]?.color}>{boolean_details[item.isActive ? 1 : 0]?.faName}</Badge>,
        action: (
          <div className="flex justify-end gap-1">
            <ActionButton type="mail" onClick={() => router.push(`/dashboard/comments?productId=${item.id}`)} />
            <ActionButton type="money" onClick={() => openStockModal(item.stocks?.at(0) ?? item.id)} />
            <ActionButton type="edit" onClick={() => openModal(item)} />
            <ActionButton
              type="delete"
              onClick={() => {
                deleteConfirmation(item, () => {
                  deleteProduct({ id: item.id }).then((res) => {
                    toast.warning(DELETE_MSG);
                  });
                });
              }}
            />
          </div>
        ),
      })),
    [deleteConfirmation, openModal, openStockModal, products, router]
  );

  return (
    <div className=" bg-white rounded-lg p-4">
      <header className="grid items-center grid-cols-3">
        <SubCategorySelector
          control={control}
          name="subCategory"
          onChange={(v) => {
            searchQueryParam('cat', v?.id, searchParams, router, pathname);
          }}
          isClearable
        />
        <h1 className="text-lg font-bold text-center">Products List</h1>
        <div className="flex justify-end">
          <Button type="button" onClick={() => openModal(true)}>
            New
          </Button>
        </div>
      </header>
      <div className="mt-4">
        <Table loading={false} tableHead={tableHeads} size="sm" data={list ?? []} paginationType="numbering" pagination={products} />
      </div>
      <ModalCMP />
      <StockModalCMP />
    </div>
  );
};

const tableHeads: TableHead[] = [
  { id: 'rowsNum', name: '#', dataAlign: 'center', minWidth: true },
  { id: 'name', name: 'Name', dataAlign: 'center' },
  { id: 'category', name: 'Category', dataAlign: 'center' },
  // { id: 'description', name: 'Description', dataAlign: 'center' },
  { id: 'createdAt', name: 'Created At', dataAlign: 'center' },
  { id: 'inStock', name: 'In Stock', dataAlign: 'center', minWidth: true },
  { id: 'discount', name: 'Discount', dataAlign: 'center', minWidth: true },
  { id: 'price', name: 'Price', dataAlign: 'center', minWidth: true },
  { id: 'status', name: 'Status', dataAlign: 'center', minWidth: true },
  { id: 'isMain', name: 'Main', dataAlign: 'center', minWidth: true },
  { id: 'isActive', name: 'Active', dataAlign: 'center', minWidth: true },
  { id: 'action', name: 'Actions', dataAlign: 'end' },
];
