import {
  useQuery,
} from "@tanstack/react-query";

import {
  getMyApplications,
} from "../api/applicationApi";
import MainLayout from "../layouts/MainLayout";

const MyApplications =
  () => {

    const {
      data,
      isLoading,
    } = useQuery({
      queryKey: [
        "applications",
      ],
      queryFn:
        getMyApplications,
    });

    if (isLoading) {
      return (
        <h1>
          Loading...
        </h1>
      );
    }

    return (
     <MainLayout >
         <div className="container mx-auto p-5">

        <h1 className="text-3xl font-bold mb-5">
          My Applications
        </h1>

        {data?.map(
          (
            application
          ) => (
            <div
              key={
                application.id
              }
              className="border p-4 rounded mb-4"
            >
              <h2 className="font-bold">
                {
                  application
                    .job
                    .title
                }
              </h2>

              <p>
                {
                  application
                    .job
                    .company
                }
              </p>
            </div>
          )
        )}
      </div>
     </MainLayout>
    );
};

export default MyApplications;