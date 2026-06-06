import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  registerUser,
} from "../api/authApi";

const Register = () => {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await registerUser(
          form
        );

        alert(
          "Registration Successful"
        );

        navigate("/login");
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={
          handleSubmit
        }
        className="border p-6 rounded w-96"
      >
        <h2 className="text-2xl mb-4">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={
            handleChange
          }
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={
            handleChange
          }
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={
            handleChange
          }
        />

        <button
          className="bg-blue-600 text-white w-full p-2"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;