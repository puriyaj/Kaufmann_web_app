'use client';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { Button, InputBox } from '@cmp/ui';
type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const { data, status } = useSession();
  if (status == 'authenticated') redirect('/dashboard');

  const { handleSubmit, control } = useForm<FormValues>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/dashboard',
    }).then((res) => {
      console.log('res login===>', res);
      if (res?.error) {
        console.log(res.error);
      } else {
        router.push(res?.url ?? '/');
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        action="/api/auth/callback/credentials"
        className="flex flex-col gap-2 mx-auto max-w-md pt-10  bg-white p-3 rounded-lg shadow-2xl justify-center "
      >
        <h2 className="text-gray-900 text-lg font-medium text-center">Login</h2>
        <div className="flex flex-col gap-3">
          <InputBox control={control} name="email" rules={{ required: { value: true, message: 'Required' } }} type="email" placeholder="Email" />
          <InputBox control={control} name="password" rules={{ required: { value: true, message: 'Required' } }} type="password" placeholder="Password" />
          <Button type="submit" loading={isPending}>
            Login
          </Button>
          <p>
            Dont have an account?<Link href="/register">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
