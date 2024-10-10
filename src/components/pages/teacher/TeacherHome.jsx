import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Bell,
  Search,
  Book,
  Users,
  FileText,
  Calendar as CalendarIcon,
  CheckCircle2,
  PlusCircle,
  Megaphone,
  Video,
  Clock,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

const quickStats = [
  { title: "Active Courses", value: 4, icon: Book },
  { title: "Total Students", value: 120, icon: Users },
  { title: "Pending Assignments", value: 15, icon: FileText },
  { title: "Upcoming Exams", value: 2, icon: CalendarIcon },
];

const upcomingDeadlines = [
  { title: "CS101 Midterm", date: "2023-06-20", urgent: true },
  { title: "CS202 Project Submission", date: "2023-06-25", urgent: false },
  { title: "CS303 Quiz", date: "2023-06-30", urgent: false },
];

const quickActions = [
  { title: "Create Assignment", icon: PlusCircle },
  { title: "Post Announcement", icon: Megaphone },
  { title: "Schedule Office Hours", icon: Calendar },
  { title: "Start Video Conference", icon: Video },
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
  { date: new Date(2023, 5, 20), title: "CS101 Midterm" },
  { date: new Date(2023, 5, 25), title: "CS202 Project Due" },
  { date: new Date(2023, 5, 30), title: "CS303 Quiz" },
];

const TeacherHome = () => {
  const [selectedDate, setSelectedDate] =
    (useState < new Date()) | (undefined > new Date());

  const todaysEvents = calendarEvents.filter(
    (event) => event.date.toDateString() === selectedDate?.toDateString()
  );
  return (
    <div className="mt-10 mx-9 md:ml-64">
      <div className="container mx-auto p-4">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Teacher" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome, Dr. Smith</h1>
              <p className="text-gray-500">
                Today is {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input className="pl-8 w-full" placeholder="Search..." />
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
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                    >
                      <action.icon className="h-6 w-6 mb-2" />
                      <span>{action.title}</span>
                    </Button>
                  ))}
                </div>
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
