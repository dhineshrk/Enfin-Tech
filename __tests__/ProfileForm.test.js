import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileForm from "../components/ProfileForm";

describe("ProfileForm Component", () => {
  test("renders form fields correctly", () => {
    render(<ProfileForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("shows error messages for empty fields", async () => {
    render(<ProfileForm />);
    fireEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  test("accepts valid input and shows success message", async () => {
    render(<ProfileForm />);
    fireEvent.input(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.input(screen.getByLabelText(/password/i), { target: { value: "Strong@123" } });

    fireEvent.click(screen.getByText(/submit/i));
    expect(await screen.findByText("Profile successfully created!")).toBeInTheDocument();
  });
});
