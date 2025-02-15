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
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Your Profile</h2>
      {message && <p style={styles.successMessage}>{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">Name</label>
          <input id="name" {...register("name")} style={styles.input} placeholder="Enter your name" />
          <p style={styles.error}>{errors.name?.message}</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input id="email" {...register("email")} style={styles.input} placeholder="Enter your email" />
          <p style={styles.error}>{errors.email?.message}</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="phone">Phone (Optional)</label>
          <input id="phone" {...register("phone")} style={styles.input} placeholder="Enter your phone number" />
          <p style={styles.error}>{errors.phone?.message}</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} style={styles.input} placeholder="Enter a strong password" />
          <p style={styles.error}>{errors.password?.message}</p>
        </div>

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  successMessage: {
    color: "green",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  formGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
