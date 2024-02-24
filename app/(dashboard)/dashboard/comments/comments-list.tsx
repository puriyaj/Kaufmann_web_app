'use client';
import { Button, Table, TableHead } from '@cmp/ui';
import React, { useMemo } from 'react';
import { ActionButton } from '@cmp/action-button';
import moment from 'moment-jalaali';
import { handleError } from '@utils/err-handler';
import { toast } from 'react-toastify';
import { DELETE_MSG, activation_status_details } from '@utils/constants';
import { Badge } from '@cmp/ui/components/badge';
import { CommentWithProduct } from 'types/types';
import { Paginated } from 'types/page';
import { deleteComment } from 'actions/comment.action';
import { useCommentStatusModal } from './comment-status-modal';
import { useConfirmation } from '@utils/hooks/confirmation.provider';

type Props = {
  comments: Paginated<CommentWithProduct>;
};

export const CommentsList: React.FC<Props> = ({ comments }) => {
  const { ModalCMP, openModal } = useCommentStatusModal();

  const { deleteConfirmation } = useConfirmation();
  const list = useMemo(
    () =>
      comments?.data.map((item, idx) => ({
        id: item.id,
        rowsNum: idx + 1,
        name: item.name,
        email: item.email,
        message: item.message,
        product: item.product?.name,
        stars: item.stars,
        status: <Badge color={activation_status_details[item.status]?.color}>{activation_status_details[item.status]?.faName}</Badge>,
        createdAt: moment(item.createdAt).format('YYYY/MM/DD'),
        action: (
          <div className="flex justify-end gap-1">
            {/* <ActionButton type="edit" /> */}
            <ActionButton type="lock" onClick={() => openModal(item)} />
            <ActionButton
              type="delete"
              onClick={() => {
                deleteConfirmation(item, () => {
                  deleteComment({ id: item.id }).then((res) => {
                    toast.warning(DELETE_MSG);
                  });
                });
              }}
            />
          </div>
        ),
      })),
    [comments, deleteConfirmation, openModal]
  );

  return (
    <div className=" bg-white rounded-lg p-4">
      <header className="grid items-center grid-cols-3">
        <div>{/* <SearchBox /> */}</div>
        <h1 className="text-lg font-bold text-center">Comments List</h1>
        <div className="flex justify-end">
          {/* <Button type="button" onClick={() => openModal(true)}>
            New
          </Button> */}
        </div>
      </header>
      <div className="mt-4">
        <Table loading={false} tableHead={tableHeads} size="xs" data={list ?? []} paginationType="numbering" pagination={comments} />
      </div>
      <ModalCMP />
    </div>
  );
};

const tableHeads: TableHead[] = [
  { id: 'rowsNum', name: '#', dataAlign: 'center', minWidth: true },
  { id: 'name', name: 'Name', dataAlign: 'center' },
  { id: 'email', name: 'Email', dataAlign: 'center' },
  { id: 'product', name: 'Product', dataAlign: 'center' },
  { id: 'message', name: 'Message', dataAlign: 'center' },
  { id: 'createdAt', name: 'Date', dataAlign: 'center' },
  { id: 'status', name: 'Status', dataAlign: 'center' },
  { id: 'stars', name: 'Stars', dataAlign: 'center', minWidth: true },
  { id: 'action', name: '', dataAlign: 'center', minWidth: true },
];
