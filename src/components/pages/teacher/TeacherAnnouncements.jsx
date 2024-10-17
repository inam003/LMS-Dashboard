import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Edit, MoreHorizontal, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockAnnouncements = [
  {
    id: 1,
    title: "Welcome to the course",
    datePosted: "2023-09-01",
    status: "Published",
  },
  {
    id: 2,
    title: "Midterm exam details",
    datePosted: "2023-10-15",
    status: "Published",
  },
  {
    id: 3,
    title: "Project deadline extended",
    datePosted: "2023-11-05",
    status: "Published",
  },
  {
    id: 4,
    title: "Holiday schedule",
    datePosted: "2023-12-01",
    status: "Scheduled",
  },
];

const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="my-10 mx-9 md:ml-64">
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                Announcements - Introduction to Computer Science
              </CardTitle>
              <CardDescription>
                Create and manage announcements for your course
              </CardDescription>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>Create New Announcement</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                  <DialogDescription>
                    Create a new announcement for your students.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="content" className="text-right">
                      Content
                    </Label>
                    <Textarea id="content" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="schedule" className="text-right">
                      Schedule
                    </Label>
                    <div className="col-span-3 flex items-center space-x-2">
                      <Input id="schedule" type="datetime-local" />
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Publish</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {announcements.length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pinned Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {announcements.filter((a) => a.isPinned).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Scheduled Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      announcements.filter((a) => a.status === "Scheduled")
                        .length
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcement List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium px-3">Title</TableHead>
                    <TableHead className="font-medium">Date Posted</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell className="font-medium px-3">
                        {announcement.title}
                      </TableCell>
                      <TableCell>{announcement.datePosted}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            announcement.status === "Published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {announcement.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => handleEditExam(exam.id)}
                            >
                              <div className="flex items-center">
                                <Edit className="size-4 mr-2" />
                                <span>Edit</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => handleDeleteExam(exam.id)}
                            >
                              <div className="flex items-center hover:text-red-500">
                                <TrashIcon className="size-4 mr-2" />
                                <span>Delete</span>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherAnnouncements;
