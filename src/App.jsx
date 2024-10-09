import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./components/pages/SignUp";
import { Login } from "./components/pages/Login";
import StudentsDashboard from "./dashboard/StudentsDashboard";
import Home from "./components/pages/student/Home";
import Exams from "./components/pages/student/Exams";
import CourseWork from "./components/pages/student/CourseWork";
import Results from "./components/pages/student/Results";
import Profile from "./components/pages/student/Profile";
import ChangePassword from "./components/pages/student/ChangePassword";
import CourseProgress from "./components/pages/student/CourseProgress";
import Announcements from "./components/pages/student/Announcements";
import Contact from "./components/pages/student/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/StudentDashboard",
    element: <StudentsDashboard />,

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "MyProfile",
        element: <Profile />,
      },
      {
        path: "ChangePassword",
        element: <ChangePassword />,
      },
      {
        path: "CourseWork",
        element: <CourseWork />,
      },
      {
        path: "Exams",
        element: <Exams />,
      },
      {
        path: "Results",
        element: <Results />,
      },
      {
        path: "Progress",
        element: <CourseProgress />,
      },
      {
        path: "Announcements",
        element: <Announcements />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
