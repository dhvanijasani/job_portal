import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createJob } from "../api/jobApi";
import MainLayout from "../layouts/MainLayout";

const AddJob = () => {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
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

        await createJob(form);

        alert(
          "Job Created Successfully"
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
    <MainLayout>

      <div className="max-w-xl mx-auto">

        <h1 className="text-3xl font-bold mb-5">
          Add Job
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="border p-2 w-full"
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            className="border p-2 w-full"
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border p-2 w-full"
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            className="border p-2 w-full"
            onChange={
              handleChange
            }
          />

          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 w-full"
            rows="5"
            onChange={
              handleChange
            }
          />

          <button
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Add Job
          </button>

        </form>

      </div>

    </MainLayout>
  );
};

export default AddJob;