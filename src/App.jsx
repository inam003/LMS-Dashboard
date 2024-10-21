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
import TeachersDashboard from "./dashboard/TeachersDashboard";
import TeacherHome from "./components/pages/teacher/TeacherHome";
import Students from "./components/pages/teacher/Students";
import TeacherAssignments from "./components/pages/teacher/TeacherAssignments";
import Grading from "./components/pages/teacher/Grading";
import TeacherExams from "./components/pages/teacher/TeacherExams";
import TeacherAnnouncements from "./components/pages/teacher/TeacherAnnouncements";
import TeacherProfile from "./components/pages/teacher/TeacherProfile";
import Settings from "./components/pages/teacher/Settings";
import Quizzes from "./components/pages/teacher/Quizzes";
import AdminDashboard from "./dashboard/AdminDashboard";
import AdminHome from "./components/pages/admin/AdminHome";

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
  {
    path: "/TeacherDashboard",
    element: <TeachersDashboard />,

    children: [
      {
        path: "",
        element: <TeacherHome />,
      },
      {
        path: "MyProfile",
        element: <TeacherProfile />,
      },
      {
        path: "Settings",
        element: <Settings />,
      },
      {
        path: "Students",
        element: <Students />,
      },
      {
        path: "Quizzes",
        element: <Quizzes />,
      },
      {
        path: "Assignments",
        element: <TeacherAssignments />,
      },
      {
        path: "Grading",
        element: <Grading />,
      },
      {
        path: "Exams",
        element: <TeacherExams />,
      },
      {
        path: "Announcements",
        element: <TeacherAnnouncements />,
      },
    ],
  },
  {
    path: "/AdminDashboard",
    element: <AdminDashboard />,

    children: [
      {
        path: "",
        element: <AdminHome />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
