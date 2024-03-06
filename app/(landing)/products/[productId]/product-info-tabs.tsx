'use client';
import { COMMENT_SENT, REQUIRED_MESSAGE } from '@utils/constants';
import { handleError } from '@utils/err-handler';
import { createComment } from 'actions/comment.action';
import { CommentCard } from 'app/(landing)/components/comment-card';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CreateComment } from 'requests/comment.dto';
import { ProductInfoWithComments } from 'types/types';

export const ProductInfoTabs: React.FC<{ product: ProductInfoWithComments }> = ({ product }) => {
  const { register, handleSubmit, reset } = useForm<CreateComment>({ defaultValues: { productId: product.id } });
  const [tab, setTab] = useState<'description' | 'comments'>('description');

  const onSubmit = async (data: CreateComment) => {
    try {
      const res = await createComment(data);
      if (res?.id) {
        toast.success('Comment created and be showed after submission');
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <section className="tabs rt-bg rt-overflow rt">
      <div className="tab-btn rt rt-14">
        <span onClick={() => setTab('description')} className={classNames('right rt-400 rt-666 rt-5px rt-pointer', tab == 'description' && 'active')} id="tab-11">
          <i className="fa fa-bars">Product Overview</i> 
        </span>
        <span onClick={() => setTab('comments')} className={classNames('right rt-400 rt-666 rt-5px rt-pointer', tab == 'comments' && 'active')} id="tab-22">
          <i className="fa fa-comments">Comments</i> 
        </span>
      </div>

      {tab == 'description' && (
        <article className="rt rt-444 rt-14 product-content" id="tab-1">
          <h2 className="title rt rt-400 rt-18 rt-relative rt-666">Discription</h2>
          <p>{product.description}</p>
        </article>
      )}
      {tab == 'comments' && (
        <div className="rt rt-444 rt-14 product-comments" id="tab-2">
          <h2 className="title rt rt-400 rt-18 rt-relative rt-666">
            {Number(product?.comments?.length ?? 0)}  comment for {product?.name}
          </h2>
          <div className="side right">
            <div className="notic rt rt-5px">
              <h3 className="name rt rt-17 rt-400 rt-relative">Rules</h3>
              <ul className="rt rt-666 rt-14">
                <li className="rt rt-400">
                  <i className="fa fa-circle">Please refrain from sending offensive comments.</i>
                </li>
                <li className="rt rt-400">
                  <i className="fa fa-circle">Please write your honest opinion.</i>
                </li>
                <li className="rt rt-400">
                  <i className="fa fa-circle">Your comment can help others with their purchases.</i> 
                </li>
              </ul>
            </div>

            <form className="rt" onSubmit={handleSubmit(onSubmit)}>
              <span className="desc rt rt-14">
              Write your comment. Your email address will not be published. Required fields are marked with an asterisk (*)
              </span>
              <input {...register('name', { required: REQUIRED_MESSAGE })} type="text" className="rt rt-5px rt-14 input rt-400" placeholder="Name*" />
              <input {...register('email')} type="email" className="rt rt-5px rt-14 input rt-400" placeholder="Email*" />
              <textarea
                {...register('message', { required: REQUIRED_MESSAGE })}
                className="rt rt-5px rt-14 input rt-400"
                rows={3}
                placeholder="Yout Comment ...*"
              ></textarea>
              {/* <img src="https://www.kohanpeykare.com/captcha/math?h1kw38S4" className="right capsa" /> */}
              {/* <input id="captcha" type="text" className="right rt-5px rt-14 input rt-400" name="captcha" placeholder="کد امنیتی*" /> */}
              <button type="submit" className="sub left rt-fff rt-5px rt-medium rt-15 rt-color rt-pointer">
                 Submit
              </button>
            </form>
          </div>
          <div className="side left rt-5px">
            <h3 className="name rt rt-17 rt-400 rt-relative">Comments</h3>
            <ol className="rt">{product?.comments?.map((it) => <CommentCard key={it.id} comment={it} />)}</ol>
          </div>
        </div>
      )}
    </section>
  );
};
