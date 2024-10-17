import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Edit,
  MoreHorizontal,
  Plus,
  Trash2,
  TrashIcon,
} from "lucide-react";

const fetchExams = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Midterm Exam",
          date: new Date("2023-11-15"),
          status: "upcoming",
          questionCount: 50,
        },
        {
          id: "2",
          title: "Final Exam",
          date: new Date("2023-12-10"),
          status: "completed",
          questionCount: 100,
        },
      ]);
    }, 1000);
  });
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Exam title must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  duration: z.number().min(1, {
    message: "Duration must be at least 1 minute.",
  }),
  questionType: z.enum(["multiple-choice", "short-answer", "essay"]),
  question: z.string().min(1, {
    message: "Question is required.",
  }),
});

const TeacherExams = () => {
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      duration: 60,
      questionType: "multiple-choice",
      question: "",
    },
  });

  useEffect(() => {
    fetchExams()
      .then((data) => {
        setExams(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch exams");
        setIsLoading(false);
      });
  }, []);

  function onSubmit(values) {
    // Here you would typically send the form data to your backend
    console.log(values);
    setIsCreateDialogOpen(false);
  }

  const handleDeleteExam = (id) => {
    setExams(exams.filter((exam) => exam.id !== id));
  };

  const handleEditExam = (id) => {
    // Placeholder for edit functionality
    console.log(`Edit exam with id: ${id}`);
  };

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="my-10 mx-9 md:ml-64">
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                Exams - Introduction to Computer Science
              </CardTitle>
              <CardDescription>
                Create, manage, and grade exams for your course
              </CardDescription>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Exam
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader className="text-left">
                  <DialogTitle>Create New Exam</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new exam.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exam Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Midterm Exam" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date > new Date("2100-01-01")
                            }
                            initialFocus
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="questionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a question type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="multiple-choice">
                                Multiple Choice
                              </SelectItem>
                              <SelectItem value="short-answer">
                                Short Answer
                              </SelectItem>
                              <SelectItem value="essay">Essay</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your question here"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Create Exam</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Exams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{exams.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Exams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {exams.filter((exam) => exam.status === "upcoming").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Exams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {exams.filter((exam) => exam.status === "completed").length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exam List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-3">Exam Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Avg. Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Loading exams...
                      </TableCell>
                    </TableRow>
                  ) : (
                    exams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium px-3">
                          {exam.title}
                        </TableCell>
                        <TableCell>{format(exam.date, "PPP")}</TableCell>
                        <TableCell className="px-0">
                          <Badge
                            variant={
                              exam.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {exam.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-5">
                          {exam.questionCount}
                        </TableCell>
                        <TableCell className="px-5">
                          {exam.averageScore ? `${exam.averageScore}%` : "N/A"}
                        </TableCell>
                        <TableCell>
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
                              <DropdownMenuSeparator />
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherExams;
