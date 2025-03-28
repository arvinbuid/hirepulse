import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {
  Landing,
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Admin,
  Profile,
  EditJob,
} from "./pages";

import {action as registerAction} from "./actions/registerAction";
import {action as loginAction} from "./actions/loginAction";
import {action as addJobAction} from "./actions/addJobAction";
import {action as editJobAction} from "./actions/editJobAction";
import {action as deleteJobAction} from "./actions/deleteJobAction";
import {action as profileAction} from "./actions/profileAction";

import {loader as dashboardLoader} from "./loaders/dashboardLoader";
import {loader as allJobsLoader} from "./loaders/allJobsLoader";
import {loader as editJobLoader} from "./loaders/editJobLoader";
import {loader as adminLoader} from "./loaders/adminLoader";
import {loader as statsLoader} from "./loaders/statsLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
