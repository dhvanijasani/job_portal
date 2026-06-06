import {
  useParams,
} from "react-router-dom";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getJobById,
} from "../api/jobApi";

import {
  applyJob,
} from "../api/applicationApi";
import MainLayout from "../layouts/MainLayout";

const JobDetails = () => {

  const { id } =
    useParams();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [
      "job",
      id,
    ],
    queryFn: () =>
      getJobById(id),
  });

  const handleApply =
    async () => {

      try {

        await applyJob(
          id
        );

        alert(
          "Applied Successfully"
        );

      } catch (error) {

        alert(
          error.response?.data
            ?.message
        );

      }
    };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
   <MainLayout >
     <div className="container mx-auto p-5">

      <h1 className="text-3xl font-bold">
        {data.title}
      </h1>

      <p>{data.company}</p>

      <p>{data.location}</p>

      <p>{data.salary}</p>

      <p className="mt-4">
        {data.description}
      </p>

      <button
        onClick={
          handleApply
        }
        className="bg-green-600 text-white px-5 py-2 rounded mt-5"
      >
        Apply Now
      </button>

    </div>
   </MainLayout>
  );
};

export default JobDetails;