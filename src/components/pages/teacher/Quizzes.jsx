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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Plus,
  MoreHorizontal,
  Edit,
  TrashIcon,
} from "lucide-react";

const fetchQuizzes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          title: "Midterm Review",
          questionCount: 5,
          status: "published",
        },
        {
          id: "2",
          title: "Final Exam Prep",
          questionCount: 10,
          status: "draft",
        },
        {
          id: "3",
          title: "Chapter 1-3 Quiz",
          questionCount: 15,
          status: "published",
        },
      ]);
    }, 1000);
  });
};

function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      cell.column.columnDef.accessorKey === "questionCount"
                        ? "px-[30px]"
                        : cell.column.columnDef.accessorKey === "status"
                        ? ""
                        : "px-6"
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [quizTitle, setQuizTitle] = useState("");
  const [quizStatus, setQuizStatus] = useState("draft");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(null);

  useEffect(() => {
    fetchQuizzes()
      .then((data) => {
        setQuizzes(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch quizzes");
        setIsLoading(false);
      });
  }, []);

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    const newQuiz = {
      id: Date.now().toString(),
      title: quizTitle,
      questionCount: questions.length,
      status: quizStatus,
    };
    setQuizzes([...quizzes, newQuiz]);
    setQuizTitle("");
    setQuizStatus("draft");
    setQuestions([]);
    setSelectedQuestionCount(null);
    setIsDialogOpen(false);
  };

  const handleDeleteQuiz = (id) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  const handleEditQuiz = (id) => {
    console.log(`Edit quiz with id: ${id}`);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "options") {
      newQuestions[index].options = value;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const handleSelectQuestionCount = (count) => {
    setSelectedQuestionCount(count);
    setQuestions(
      Array(count).fill({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      })
    );
  };

  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    { accessorKey: "questionCount", header: "Questions" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === "published" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const quiz = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEditQuiz(quiz.id)}
              >
                <div className="flex items-center">
                  <Edit className="size-4 ml-2" />
                  Edit
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleDeleteQuiz(quiz.id)}
              >
                <div className="flex items-center hover:text-red-500">
                  <TrashIcon className="size-4 ml-2" />
                  <span>Delete</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="mt-10 mx-9 md:ml-64">
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                Quizzes - Introduction to Computer Science
              </CardTitle>
              <CardDescription>
                Create and manage quizzes for your course
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create Quiz
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Quiz</DialogTitle>
                  <DialogDescription>
                    Create a new quiz with 5, 10, or 15 multiple choice
                    questions.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateQuiz} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quizTitle">Quiz Title</Label>
                    <Input
                      id="quizTitle"
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Quiz Status</Label>
                    <RadioGroup
                      value={quizStatus}
                      onValueChange={(value) => setQuizStatus(value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="draft" id="draft" />
                        <Label htmlFor="draft">Draft</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="published" id="published" />
                        <Label htmlFor="published">Published</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Number of Questions</Label>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        onClick={() => handleSelectQuestionCount(5)}
                        variant={
                          selectedQuestionCount === 5 ? "default" : "outline"
                        }
                      >
                        5 Questions
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleSelectQuestionCount(10)}
                        variant={
                          selectedQuestionCount === 10 ? "default" : "outline"
                        }
                      >
                        10 Questions
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleSelectQuestionCount(15)}
                        variant={
                          selectedQuestionCount === 15 ? "default" : "outline"
                        }
                      >
                        15 Questions
                      </Button>
                    </div>
                  </div>
                  {questions.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <Label>Question {index + 1}</Label>
                      <Input
                        value={question.question}
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            "question",
                            e.target.value
                          )
                        }
                        required
                      />
                      <Label>Options</Label>
                      {question.options.map((option, optionIndex) => (
                        <Input
                          key={optionIndex}
                          value={option}
                          onChange={(e) =>
                            handleQuestionChange(index, "options", [
                              ...question.options.slice(0, optionIndex),
                              e.target.value,
                              ...question.options.slice(optionIndex + 1),
                            ])
                          }
                          required
                        />
                      ))}
                    </div>
                  ))}
                  <Button type="submit" disabled={questions.length === 0}>
                    Create Quiz
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <DataTable columns={columns} data={quizzes} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quizzes;
