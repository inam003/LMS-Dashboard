import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  CalendarDays,
} from "lucide-react";

const kpiData = [
  { title: "Total Students", value: 5280, icon: Users, change: 12 },
  { title: "Total Teachers", value: 320, icon: GraduationCap, change: 5 },
  { title: "Active Courses", value: 150, icon: BookOpen, change: -2 },
  { title: "Revenue", value: 287500, icon: DollarSign, change: 8 },
];

const recentActivities = [
  { user: "John Doe", action: "enrolled in", target: "Advanced Mathematics" },
  {
    user: "Jane Smith",
    action: "submitted assignment for",
    target: "Introduction to Physics",
  },
  {
    user: "Admin User",
    action: "added new course",
    target: "Web Development Fundamentals",
  },
  { user: "Sarah Johnson", action: "updated profile information", target: "" },
  {
    user: "Mike Brown",
    action: "completed course",
    target: "Data Science Basics",
  },
  {
    user: "Mike Brown",
    action: "completed course",
    target: "Data Science Basics",
  },
  {
    user: "Mike Brown",
    action: "completed course",
    target: "Data Science Basics",
  },
];

const topCourses = [
  { name: "Introduction to Programming", enrollments: 320 },
  { name: "Data Science Fundamentals", enrollments: 280 },
  { name: "Web Development Bootcamp", enrollments: 250 },
  { name: "Machine Learning Basics", enrollments: 200 },
  { name: "Digital Marketing Essentials", enrollments: 180 },
  { name: "Frontend Development", enrollments: 200 },
  { name: "Cyber Security", enrollments: 300 },
];

const upcomingEvents = [
  {
    date: new Date(2024, 9, 25),
    title: "Fall Semester Start",
    type: "academic",
  },
  {
    date: new Date(2024, 10, 15),
    title: "Teacher Training Workshop",
    type: "training",
  },
  { date: new Date(2024, 10, 20), title: "Student Orientation", type: "event" },
  {
    date: new Date(2024, 11, 1),
    title: "Course Registration Deadline",
    type: "deadline",
  },
  {
    date: new Date(2024, 11, 10),
    title: "Annual Education Conference",
    type: "conference",
  },
];

const AdminHome = () => {
  return (
    <div className="mt-10 mx-9 md:ml-64">
      <div className="container mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {kpi.title === "Revenue"
                    ? `$${kpi.value.toLocaleString()}`
                    : kpi.value.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {kpi.change > 0 ? "+" : ""}
                  {kpi.change}% from last month
                </p>
                <Progress
                  value={50 + kpi.change}
                  className="mt-2"
                  indicatorColor={
                    kpi.change >= 0 ? "bg-green-500" : "bg-red-500"
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest actions across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      {activity.target && (
                        <span className="font-medium">{activity.target}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      2 minutes ago
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
              <CardDescription>
                Courses with highest enrollments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {topCourses.map((course, index) => (
                  <div
                    key={index}
                    className="mb-4 last:mb-0 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Enrollments: {course.enrollments}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="mb-4 last:mb-0 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;
