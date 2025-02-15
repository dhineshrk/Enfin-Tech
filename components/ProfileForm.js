"use client"; 

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().matches(/^\d*$/, "Phone must be numeric").optional(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/\d/, "Must include at least one number")
    .matches(/[@#$%^&*!]/, "Must include at least one special character"),
});

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    setMessage("Profile successfully created!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Create Your Profile</h2>
      {message && <p className="text-green-400 mb-4 text-center">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">Name</label>
          <input id="name" {...register("name")} className="border p-2 w-full rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
          <p className="text-red-400 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">Email</label>
          <input id="email" {...register("email")} className="border p-2 w-full rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
          <p className="text-red-400 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="phone" className="block font-medium">Phone (Optional)</label>
          <input id="phone" {...register("phone")} className="border p-2 w-full rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500" placeholder="Enter your phone number" />
          <p className="text-red-400 text-sm">{errors.phone?.message}</p>
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">Password</label>
          <input id="password" type="password" {...register("password")} className="border p-2 w-full rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500" placeholder="Enter a strong password" />
          <p className="text-red-400 text-sm">{errors.password?.message}</p>
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">Submit</button>
      </form>
    </div>
  );
}