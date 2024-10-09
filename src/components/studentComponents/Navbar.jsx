import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut, Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import logo from "../../../public/logo.png";
import defaultAvatar from "../../../public/defaultAvatar.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import home from "../../../public/home.png";
import exam from "../../../public/exam.png";
import assignment from "../../../public/assignment.png";
import result from "../../../public/result.png";
import attendance from "../../../public/attendance.png";
import event from "../../../public/event.png";
import message from "../../../public/message.png";
import announcement from "../../../public/announcement.png";
import reset_password from "../../../public/reset_password.png";

const Navbar = () => {
  const menus = [
    {
      path: "/StudentDashboard",
      icon: <img src={home} />,
      title: "Home",
    },
    {
      path: "Exams",
      icon: <img src={exam} />,
      title: "Exams",
    },
    {
      path: "Assignments",
      icon: <img src={assignment} />,
      title: "Assignments",
    },
    {
      path: "Results",
      icon: <img src={result} />,
      title: "Results",
    },
    {
      path: "Attendance",
      icon: <img src={attendance} />,
      title: "Attendance",
    },
    {
      path: "Events",
      icon: <img src={event} />,
      title: "Events",
    },
    {
      path: "Messages",
      icon: <img src={message} />,
      title: "Messages",
    },
    {
      path: "Announcements",
      icon: <img src={announcement} />,
      title: "Announcements",
    },
  ];
  return (
    <header className="bg-white fixed w-full top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden md:flex">
        <NavLink to="/StudentDashboard">
          <img src={logo} width={70} />
        </NavLink>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[250px] pl-2 pt-2" side="left">
          <NavLink to="/StudentDashboard">
            <img src={logo} width={80} />
          </NavLink>
          <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4">
            {menus.map((item, id) => (
              <div key={id}>
                <NavLink
                  to={item.path}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-slate-200"
                >
                  <span className="size-4 ">{item.icon}</span>
                  {item.title}
                </NavLink>
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto lg:gap-6">
        <div className="ml-auto flex items-center gap-4 flex-1 sm:flex-initial">
          <div className="relative hidden md:flex md:flex-col">
            <p className="text-sm">MUHAMMAD INAM ASLAM</p>
            <p className="text-xs">(bc110101103)</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar className="size-12">
                <AvatarImage src={defaultAvatar} />
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>MUHAMMAD INAM ASLAM</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              <Link className="flex items-center" to={"/StudentDashboard/MyProfile"}>
                <User className="mr-2 size-4" />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              <Link
                className="flex items-center"
                to={"/StudentDashboard/ChangePassword"}
              >
                <img src={reset_password} className="mr-2 size-4" />
                Change Password
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              <LogOut className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
