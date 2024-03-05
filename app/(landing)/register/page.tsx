"use client";
import React, { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { Button } from "@cmp/ui";

type FormInput = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit } = useForm<FormInput>();
  //router
  const router = useRouter();
  const onSubmit = async (item: FormInput) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        email: item.email,
        password: item.password,
      }),
    });
    if (res.ok) {
      router.push("/login");
    } else {
      console.error("register failed");
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, "Name must be characters or less.").required("Name is required"),
      email: Yup.string().email("Invalid email address").required("email is required"),
      password: Yup.string().min(8, "password must be more than 8 characters").required("password is required"),
    }),

    onSubmit: (values) => {
      startTransition(() => {
        onSubmit(values);
      });
    },
  });

  return (
  
       <div className=" pt-3">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md pt-10  bg-white p-3 rounded-lg shadow-2xl justify-center ">
        <h2 className="text-gray-900 text-lg font-medium text-center">Sign Up</h2>

        <div className="flex flex-col gap-3">
          <label className={`${formik.touched.name && formik.errors.name ? "text-red-400" : ""}`}>{formik.errors.name ? formik.errors.name : "Name"}</label>
          <input className="border border-black rounded-xl" type="name" {...register("name")} placeholder=" Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />

          <label className={`${formik.touched.email && formik.errors.email ? "text-red-400" : ""} `}>{formik.errors.email ? formik.errors.email : "Email"}</label>
          <input className="border border-black rounded-xl" type="email" {...register("email")} placeholder=" Email" value={formik.values.email} onChange={formik.handleChange} />
          <label className={`${formik.touched.password && formik.errors.password ? "text-red-400" : ""}`}>{formik.errors.password ? formik.errors.password : "Password"}</label>
          <input className="border border-black rounded-xl" type="password" {...register("password")} placeholder=" Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />

          <Button loading={isPending} type="submit">
            Sign Up
          </Button>
          <p>
            Already have an account?<Link className="text-blue-500" href="/login"> Login</Link>
          </p>
        </div>
      </form>
    </div>

   
  );
}
