import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-5 shadow">

      <h2 className="text-xl font-bold">
        {job.title}
      </h2>

      <p>{job.company}</p>

      <p>{job.location}</p>

      <p>{job.salary}</p>

      <Link
        to={`/jobs/${job.id}`}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3 inline-block"
      >
        View Details
      </Link>

    </div>
  );
};

export default JobCard;