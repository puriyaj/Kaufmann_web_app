'use client';
import { REQUIRED_MESSAGE } from '@utils/constants';
import { handleError } from '@utils/err-handler';
import { createTicket } from 'actions/ticket.action';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CreateTicket } from 'requests/ticket.dto';

export const ContactForm = () => {
  const { handleSubmit, register, reset } = useForm<CreateTicket>();

  const onSubmit = async (data: CreateTicket) => {
    try {
      await createTicket(data).then((res) => {
        if (res) {
          toast.success('message sent successfully');
          reset();
        }
      });
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="side rt-bg left">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name', { required: REQUIRED_MESSAGE })} type="text" placeholder=" Your Name" className="rt rt-5px rt-14 input rt-400" />
        <input {...register('email', { required: REQUIRED_MESSAGE })} type="text" placeholder="Email" className="rt rt-5px rt-14 input rt-400" />
        <input {...register('phoneNumber')} type="text" placeholder="Phone Number" className="rt rt-5px rt-14 input rt-400" />
        <input {...register('subject', { required: REQUIRED_MESSAGE })} type="text" placeholder="Subject" className="rt rt-5px rt-14 input rt-400" />
        <textarea {...register('message', { required: REQUIRED_MESSAGE })} placeholder="Your Message" className="rt rt-5px rt-14 input rt-400"></textarea>
        {/* <img src="https://www.kohanpeykare.com/captcha/math?t1AH7AfZ" className="right capsa" />
        <input id="captcha" type="text" className="right rt-5px rt-14 input rt-400" placeholder="کد امنیتی*" name="captcha" /> */}
        <button type="submit" className="sub left rt-fff rt-5px rt-medium rt-15 rt-color rt-pointer">
           Send
        </button>
      </form>
    </div>
  );
};
