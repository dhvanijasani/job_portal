import { useState } from "react";

import {
  loginUser,
} from "../api/authApi";

import {
  useNavigate,
} from "react-router-dom";

const Login = () => {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
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
        const data =
          await loginUser(
            form
          );

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        navigate("/");
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
          Login
        </h2>

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
          className="bg-green-600 text-white w-full p-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;