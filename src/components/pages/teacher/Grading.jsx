import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, Search } from "lucide-react";

const fetchGrades = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          studentName: "Alice Johnson",
          studentId: "S001",
          assignmentName: "Midterm Quiz",
          type: "quiz",
          grade: 85,
          maxGrade: 100,
          submissionDate: "2023-10-15",
        },
        {
          id: "2",
          studentName: "Bob Smith",
          studentId: "S002",
          assignmentName: "Midterm Quiz",
          type: "quiz",
          grade: 92,
          maxGrade: 100,
          submissionDate: "2023-10-15",
        },
        {
          id: "3",
          studentName: "Charlie Brown",
          studentId: "S003",
          assignmentName: "Midterm Quiz",
          type: "quiz",
          grade: 78,
          maxGrade: 100,
          submissionDate: "2023-10-15",
        },
        {
          id: "4",
          studentName: "Alice Johnson",
          studentId: "S001",
          assignmentName: "Programming Assignment 1",
          type: "assignment",
          grade: 95,
          maxGrade: 100,
          submissionDate: "2023-10-20",
        },
        {
          id: "5",
          studentName: "Bob Smith",
          studentId: "S002",
          assignmentName: "Programming Assignment 1",
          type: "assignment",
          grade: 88,
          maxGrade: 100,
          submissionDate: "2023-10-20",
        },
        {
          id: "6",
          studentName: "Charlie Brown",
          studentId: "S003",
          assignmentName: "Programming Assignment 1",
          type: "assignment",
          grade: 91,
          maxGrade: 100,
          submissionDate: "2023-10-20",
        },
      ]);
    }, 1000);
  });
};

function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center pb-4">
        <Input
          placeholder="Filter students..."
          value={table.getColumn("studentName")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("studentName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                        cell.column.columnDef.accessorKey === "assignmentName"
                          ? "px-2"
                          : cell.column.columnDef.accessorKey === "type"
                          ? "px-2"
                          : cell.column.columnDef.accessorKey === "grade"
                          ? ""
                          : "px-6"
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const Grading = () => {
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingGrade, setEditingGrade] = useState(null);

  useEffect(() => {
    fetchGrades()
      .then((data) => {
        setGrades(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch grades");
        setIsLoading(false);
      });
  }, []);

  const handleEditGrade = (grade) => {
    setEditingGrade(grade);
  };

  const handleUpdateGrade = (updatedGrade) => {
    if (editingGrade) {
      const updatedGrades = grades.map((g) =>
        g.id === editingGrade.id ? { ...g, grade: updatedGrade } : g
      );
      setGrades(updatedGrades);
      setEditingGrade(null);
    }
  };

  const columns = [
    {
      accessorKey: "studentName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Student Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "studentId",
      header: "Student ID",
    },
    {
      accessorKey: "assignmentName",
      header: "Assignment",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type");
        return (
          <Badge variant={type === "quiz" ? "default" : "secondary"}>
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "grade",
      header: "Grade",
      cell: ({ row }) => {
        const grade = row.original;
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-slate-100"
                onClick={() => handleEditGrade(grade)}
              >
                {grade.grade}/{grade.maxGrade}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Grade</DialogTitle>
                <DialogDescription>
                  Update the grade for {grade.studentName} on{" "}
                  {grade.assignmentName}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="grade" className="text-right">
                    Grade
                  </Label>
                  <Input
                    id="grade"
                    defaultValue={grade.grade}
                    className="col-span-3"
                    onChange={(e) => {
                      const newGrade = parseInt(e.target.value);
                      if (
                        !isNaN(newGrade) &&
                        newGrade >= 0 &&
                        newGrade <= grade.maxGrade
                      ) {
                        handleUpdateGrade(newGrade);
                      }
                    }}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      },
    },
    {
      accessorKey: "submissionDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Submission Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="my-10 mx-9 md:ml-64">
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              Grading - Introduction to Computer Science
            </CardTitle>
            <CardDescription>
              View and manage student grades for quizzes and assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Entries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{grades.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Grade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {grades.length > 0
                      ? (
                          grades.reduce(
                            (sum, grade) =>
                              sum + (grade.grade / grade.maxGrade) * 100,
                            0
                          ) / grades.length
                        ).toFixed(2) + "%"
                      : "N/A"}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Last Updated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {grades.length > 0
                      ? new Date(
                          Math.max(
                            ...grades.map((g) =>
                              new Date(g.submissionDate).getTime()
                            )
                          )
                        ).toLocaleDateString()
                      : "N/A"}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">Grade Entries</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading grades...</div>
            ) : (
              <DataTable columns={columns} data={grades} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Grading;
