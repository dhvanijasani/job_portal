import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getJobs } from "../api/jobApi";
import JobCard from "../components/JobCard";
import MainLayout from "../layouts/MainLayout";

const Jobs = () => {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <h1 className="text-2xl font-semibold">
            Loading Jobs...
          </h1>
        </div>
      </MainLayout>
    );
  }

  const filteredJobs = data?.filter((job) => {
    const searchTerm =
      search.toLowerCase();

    return (
      job.title
        .toLowerCase()
        .includes(searchTerm) ||

      job.company
        .toLowerCase()
        .includes(searchTerm) ||

      job.location
        .toLowerCase()
        .includes(searchTerm)
    );
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center mb-3">
          Find Your Dream Job 🚀
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Search jobs by title, company or location
        </p>

        {/* Search Box */}

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-2/3 lg:w-1/2 border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Jobs */}

        <div className="mb-6">
          <h2 className="text-lg font-medium">
            Total Jobs Found:{" "}
            <span className="text-blue-600">
              {filteredJobs?.length || 0}
            </span>
          </h2>
        </div>

        {/* Jobs Grid */}

        {filteredJobs?.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-500">
              No Jobs Found 😔
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs?.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default Jobs;