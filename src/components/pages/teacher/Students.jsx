import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/ui/data-table";
import { ArrowUpDown, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const fetchRecentActivities = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(recentActivities);
    }, 1000);
  });
};

const fetchStudents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(students);
    }, 1000);
  });
};

// Mock data
const students = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    currentGrade: "A",
    attendanceRate: 95,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    currentGrade: "B",
    attendanceRate: 88,
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    currentGrade: "B+",
    attendanceRate: 92,
  },
  {
    id: "4",
    name: "Diana Ross",
    email: "diana@example.com",
    currentGrade: "A-",
    attendanceRate: 97,
  },
  {
    id: "5",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    currentGrade: "C+",
    attendanceRate: 85,
  },
  {
    id: "6",
    name: "Fiona Davis",
    email: "fiona@example.com",
    currentGrade: "A",
    attendanceRate: 93,
  },
  {
    id: "7",
    name: "George King",
    email: "george@example.com",
    currentGrade: "B-",
    attendanceRate: 82,
  },
  {
    id: "8",
    name: "Hannah Lee",
    email: "hannah@example.com",
    currentGrade: "A+",
    attendanceRate: 99,
  },
  {
    id: "9",
    name: "Isaac Newton",
    email: "isaac@example.com",
    currentGrade: "B",
    attendanceRate: 89,
  },
  {
    id: "10",
    name: "Julia Roberts",
    email: "julia@example.com",
    currentGrade: "A-",
    attendanceRate: 96,
  },
  {
    id: "11",
    name: "Kevin Hart",
    email: "kevin@example.com",
    currentGrade: "C",
    attendanceRate: 80,
  },
  {
    id: "12",
    name: "Laura Palmer",
    email: "laura@example.com",
    currentGrade: "B+",
    attendanceRate: 91,
  },
  {
    id: "13",
    name: "Mike Tyson",
    email: "mike@example.com",
    currentGrade: "B",
    attendanceRate: 87,
  },
  {
    id: "14",
    name: "Nina Simone",
    email: "nina@example.com",
    currentGrade: "A",
    attendanceRate: 94,
  },
  {
    id: "15",
    name: "Oscar Wilde",
    email: "oscar@example.com",
    currentGrade: "C+",
    attendanceRate: 83,
  },
];

const recentActivities = [
  {
    id: "1",
    student: "Alice Johnson",
    action: "Submitted assignment",
    time: "2 hours ago",
  },
  {
    id: "2",
    student: "Bob Smith",
    action: "Posted in forum",
    time: "4 hours ago",
  },
  {
    id: "3",
    student: "Charlie Brown",
    action: "Viewed lecture notes",
    time: "1 day ago",
  },
  {
    id: "4",
    student: "Diana Ross",
    action: "Completed quiz",
    time: "1 day ago",
  },
  {
    id: "5",
    student: "Ethan Hunt",
    action: "Attended virtual office hours",
    time: "2 days ago",
  },
];

const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${row.original.name}`}
            />
            <AvatarFallback>
              {row.original.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "currentGrade",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Current Grade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "attendanceRate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Attendance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Progress
            value={row.original.attendanceRate}
            className="w-[60px] mr-2"
          />
          <span>{row.original.attendanceRate}%</span>
        </div>
      );
    },
  },
];

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchStudents()
      .then((data) => {
        setStudents(data);
        setFilteredStudents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch student data");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  useEffect(() => {
    fetchRecentActivities()
      .then((data) => {
        setActivities(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch recent activities");
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="mt-10 mx-9 md:ml-64">
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Students - Introduction to Computer Science
            </CardTitle>
            <CardDescription>
              Manage and view student information for your course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{students.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Grade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">B+</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Attendance Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 lg:col-span-2 mb-6">
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  className="pl-8"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <DataTable columns={columns} data={filteredStudents} />
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <ScrollArea className="h-[300px]">
                <ul className="space-y-4">
                  {activities.map((activity) => (
                    <li
                      key={activity.id}
                      className="flex items-start space-x-4"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${activity.student}`}
                        />
                        <AvatarFallback>
                          {activity.student
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.student}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Students;
