import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Book,
  Users,
  FileText,
  Calendar as CalendarIcon,
  PlusCircle,
  Megaphone,
  Video,
  Clock,
  MessageCircle,
  ChevronRight,
  BarChart,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const quickStats = [
  { title: "Total Students", value: 30, icon: Users },
  { title: "Assignments", value: 5, icon: FileText },
  { title: "Upcoming Exams", value: 2, icon: CalendarIcon },
  { title: "Course Progress", value: "65%", icon: BarChart },
];

const upcomingDeadlines = [
  { title: "CS101 Midterm", date: "2023-06-20", urgent: true },
  { title: "CS202 Project Submission", date: "2023-06-25", urgent: false },
  { title: "CS303 Quiz", date: "2023-06-30", urgent: false },
];

const course = {
  id: "CS101",
  name: "Introduction to Computer Science",
  students: 30,
  progress: 65,
  description:
    "This course provides an introduction to the fundamental concepts of computer science, including programming, algorithms, and data structures.",
  nextLecture: "Data Types and Variables",
  nextLectureDate: "2024-10-12",
};

const recentActivities = [
  {
    user: "John Doe",
    action: "submitted assignment",
    course: "CS101",
    time: "2 hours ago",
  },
  {
    user: "Jane Smith",
    action: "asked a question",
    course: "CS202",
    time: "4 hours ago",
  },
  {
    user: "Mike Johnson",
    action: "viewed lecture notes",
    course: "CS303",
    time: "1 day ago",
  },
];

const recentMessages = [
  {
    sender: "John Doe",
    message: "Question about the upcoming exam",
    time: "2 hours ago",
  },
  {
    sender: "Jane Smith",
    message: "Submitted my assignment",
    time: "5 hours ago",
  },
  {
    sender: "Admin",
    message: "New department policy update",
    time: "1 day ago",
  },
];

const calendarEvents = [
  { date: new Date(2024, 9, 10), title: "CS101 Midterm" },
  { date: new Date(2024, 9, 10), title: "CS202 Project Due" },
  { date: new Date(2024, 9, 10), title: "CS303 Quiz" },
];

const TeacherHome = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todaysEvents = calendarEvents.filter(
    (event) => event.date.toDateString() === selectedDate?.toDateString()
  );
  return (
    <div className="mt-10 mx-9 md:ml-64">
      <div className="container mx-auto pb-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome, Prof Muhammad Inam Aslam
              </h1>
              <p className="text-gray-500">
                Today is {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Course Overview: {course.id}</CardTitle>
                <CardDescription>{course.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Students</span>
                    <Badge variant="outline">{course.students}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Course Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="w-full" />
                  </div>
                  <div className="pt-2">
                    <p className="text-sm font-medium">
                      Next Lecture: {course.nextLecture}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Date: {course.nextLectureDate}
                    </p>
                  </div>
                  <Button className="w-full">
                    View Course Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{deadline.title}</span>
                      </div>
                      <Badge
                        variant={deadline.urgent ? "destructive" : "outline"}
                      >
                        {deadline.date}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <Avatar className="mt-0.5">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${activity.user}`}
                          alt={activity.user}
                        />
                        <AvatarFallback>
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user}{" "}
                          <span className="text-muted-foreground">
                            {activity.action}
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.course}
                        </p>
                        <div className="flex items-center pt-2">
                          <Clock className="mr-2 h-3 w-3 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentMessages.map((message, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <MessageCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{message.sender}</p>
                        <p className="text-sm text-gray-500">
                          {message.message}
                        </p>
                        <p className="text-xs text-gray-400">{message.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="link" className="mt-4 w-full">
                  View All Messages
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">
                    Events for {selectedDate?.toDateString()}
                  </h4>
                  {todaysEvents.length > 0 ? (
                    <ul className="space-y-2">
                      {todaysEvents.map((event, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{event.title}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No events scheduled for this day.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
