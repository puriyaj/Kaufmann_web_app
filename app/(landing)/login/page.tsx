'use client';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { Button, InputBox } from '@cmp/ui';
import { USER_ROLE } from '../../../prisma/generated/client';
import { useToast } from "@/components/ui/use-toast"

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const { data, status } = useSession();
  const { toast } = useToast()
  console.log(data?.user,status);
  if (status == 'authenticated' && data.user.role == USER_ROLE.USER) redirect('/profile');
  if (status == 'authenticated' && data.user.role == USER_ROLE.ADMIN) redirect('/dashboard');

  

  const { handleSubmit, control } = useForm<FormValues>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((res) => {
      console.log('res login===>', res);
      if (res?.error) {
        toast({
          className: "bg-red-500",
          variant: "destructive",
          title: "Error",
          description: "Email or Password is wrong",
          
        })
      }
    });
  };

  return (
    <div className="p-3 h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        action="/api/auth/callback/credentials"
        className="flex flex-col gap-2 mx-auto max-w-md pt-10  bg-gray-100 p-3 rounded-lg shadow-2xl justify-center "
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

          <Button type="submit" onClick={() => signIn('google',{ callbackUrl: 'http://localhost:3000/profile'})}>google</Button>
        </div>
      </form>
    </div>
  );
}
