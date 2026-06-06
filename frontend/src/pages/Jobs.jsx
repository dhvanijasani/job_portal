import { useQuery } from "@tanstack/react-query";

import { getJobs } from "../api/jobApi";
import JobCard from "../components/JobCard";
import MainLayout from "../layouts/MainLayout";

const Jobs = () => {

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <MainLayout>
        <div className="container mx-auto p-5">

      <h1 className="text-3xl font-bold mb-5">
        Available Jobs
      </h1>

      <div className="grid md:grid-cols-3 gap-5">

        {data?.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}

      </div>

    </div>
    </MainLayout>
    
  );
};

export default Jobs;