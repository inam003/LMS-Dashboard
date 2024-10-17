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
import { Textarea } from "@/components/ui/textarea";
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
  Delete,
  Edit,
  MoreHorizontal,
  Plus,
  TrashIcon,
} from "lucide-react";

const fetchAssignments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(students);
    }, 1000);
  });
};

const students = [
  {
    id: "1",
    name: "Midterm Project",
    dueDate: "2023-11-15",
    status: "published",
  },
  { id: "2", name: "Final Essay", dueDate: "2023-12-10", status: "draft" },
  {
    id: "3",
    name: "Group Presentation",
    dueDate: "2023-11-30",
    status: "published",
  },
];

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
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      cell.column.columnDef.accessorKey === "dueDate"
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

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("draft");

  useEffect(() => {
    fetchAssignments()
      .then((data) => {
        setAssignments(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch assignments");
        setIsLoading(false);
      });
  }, []);

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const newAssignment = { id: Date.now().toString(), name, dueDate, status };
    setAssignments([...assignments, newAssignment]);
    setName("");
    setDescription("");
    setDueDate("");
    setStatus("draft");
    setIsDialogOpen(false);
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  };

  const handleEditAssignment = (id) => {
    console.log(`Edit assignment with id: ${id}`);
  };

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
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
        const assignment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEditAssignment(assignment.id)}
              >
                <div className="flex items-center">
                  <Edit className="size-4 mr-2" />
                  Edit
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleDeleteAssignment(assignment.id)}
              >
                <div className="flex items-center hover:text-red-500">
                  <TrashIcon className="size-4 mr-2" />
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
                Assignments - Introduction to Computer Science
              </CardTitle>
              <CardDescription>
                Manage and view assignments for your course
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new assignment.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateAssignment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Assignment Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <RadioGroup value={status} onValueChange={setStatus}>
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
                  <Button type="submit">Create Assignment</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{assignments.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Published Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {assignments.filter((a) => a.status === "published").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Draft Assignments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {assignments.filter((a) => a.status === "draft").length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 lg:col-span-2 mb-6">
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <DataTable columns={columns} data={assignments} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherAssignments;
