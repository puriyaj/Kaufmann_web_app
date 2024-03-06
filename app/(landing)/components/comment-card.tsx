import { Comment } from '../../../prisma/generated/client';
import moment from 'moment';
import React from 'react';
import Image from 'next/image';


export const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <li className="rt">
      <Image src="/image/avatar.jpg" alt="user" width={52} height={52} className="avatar right rt-color rt-50px" />
      <div className="inl left">
        <div className="info rt rt-777 rt-13">
          <span className="rt-400">{comment.name}</span> <span>{moment(comment.createdAt).format('YYYY/MM/DD dddd')}</span>
        </div>
        <div className="des rt-13 rt-400 rt">
          <p>{comment.message}</p>
        </div>
      </div>
    </li>
  );
};
