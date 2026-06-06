import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import MyApplications from "../pages/MyApplications";
import ProtectedRoute from "../components/ProtectedRoute";
import AddJob from "../pages/AddJob";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
  path="/add-job"
  element={
    <ProtectedRoute>
      <AddJob />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;