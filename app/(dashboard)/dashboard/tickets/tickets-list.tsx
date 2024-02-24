'use client';
import { Button, Table, TableHead } from '@cmp/ui';
import React, { useMemo } from 'react';
import { ActionButton } from '@cmp/action-button';
import moment from 'moment-jalaali';
import { handleError } from '@utils/err-handler';
import { toast } from 'react-toastify';
import { DELETE_MSG, activation_status_details } from '@utils/constants';
import { Badge } from '@cmp/ui/components/badge';
import { CommentWithProduct, TicketWithUser } from 'types/types';
import { Paginated } from 'types/page';
import { deleteComment } from 'actions/comment.action';
import { useTicketStatusModal } from './ticket-status-modal';
import { useConfirmation } from '@utils/hooks/confirmation.provider';
import { deleteTicket } from 'actions/ticket.action';

type Props = {
  tickets: Paginated<TicketWithUser>;
};

export const TicketsList: React.FC<Props> = ({ tickets }) => {
  const { ModalCMP, openModal } = useTicketStatusModal();

  const { deleteConfirmation } = useConfirmation();
  const list = useMemo(
    () =>
      tickets?.data.map((item, idx) => ({
        id: item.id,
        rowsNum: idx + 1,
        subject: item.subject,
        email: item.email,
        phoneNumber: item.phoneNumber ?? '-',
        message: item.message,
        user: item.user?.name,
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
                  deleteTicket({ id: item.id }).then((res) => {
                    toast.warning(DELETE_MSG);
                  });
                });
              }}
            />
          </div>
        ),
      })),
    [deleteConfirmation, openModal, tickets]
  );

  return (
    <div className=" bg-white rounded-lg p-4">
      <header className="grid items-center grid-cols-3">
        <div>{/* <SearchBox /> */}</div>
        <h1 className="text-lg font-bold text-center">Tickets List</h1>
        <div className="flex justify-end">
          {/* <Button type="button" onClick={() => openModal(true)}>
            New
          </Button> */}
        </div>
      </header>
      <div className="mt-4">
        <Table loading={false} tableHead={tableHeads} size="xs" data={list ?? []} paginationType="numbering" pagination={tickets} />
      </div>
      <ModalCMP />
    </div>
  );
};

const tableHeads: TableHead[] = [
  { id: 'rowsNum', name: '#', dataAlign: 'center', minWidth: true },
  { id: 'subject', name: 'Subject', dataAlign: 'center' },
  { id: 'email', name: 'Email', dataAlign: 'center' },
  { id: 'phoneNumber', name: 'Phone Number', dataAlign: 'center' },
  { id: 'user', name: 'User', dataAlign: 'center' },
  { id: 'message', name: 'Message', dataAlign: 'center' },
  { id: 'createdAt', name: 'Date', dataAlign: 'center' },
  { id: 'status', name: 'Status', dataAlign: 'center' },
  { id: 'action', name: '', dataAlign: 'center', minWidth: true },
];
