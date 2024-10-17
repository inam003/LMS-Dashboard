import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen } from "lucide-react"

// Mock student data
const studentData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 987-6543",
  address: "456 Campus Ave, College Town, 54321",
  studentId: "S12345",
  major: "Computer Science",
  year: "Junior",
  gpa: "3.8",
  enrollmentDate: "2021-09-01",
  expectedGraduation: "2025-05-15",
  bio: "Passionate computer science student with a focus on artificial intelligence and machine learning. Active member of the Coding Club and Robotics Team.",
  courses: [
    { code: "CS301", name: "Data Structures and Algorithms", grade: "A" },
    { code: "CS302", name: "Database Systems", grade: "A-" },
    { code: "MATH201", name: "Linear Algebra", grade: "B+" },
  ],
  avatar: "../../../../public/ava1.avif",
  notificationPreferences: {
    email: true,
    sms: true,
    inApp: true,
  },
}

export default function StudentProfilePage() {
  const [student, setStudent] = useState(studentData)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStudent(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving profile:", student)
    setIsEditing(false)
  }

  return (
    <div className="my-10 mx-9 md:ml-64">
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Student Profile</CardTitle>
            <CardDescription>View and manage your personal information</CardDescription>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-y-8">
            <div className="flex items-center justify-center">
              <Avatar className="size-48 mx-8">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="mt-4 text-center">
                  <Label htmlFor="avatar-upload" className="cursor-pointer text-blue-500 hover:text-blue-600">
                    Change Avatar
                  </Label>
                  <Input id="avatar-upload" type="file" className="hidden" />
                </div>
              )}
            </div>
            <div className="md:w-2/3">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList>
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="academic">Academic Info</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={student.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={student.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={student.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={student.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="academic">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          name="studentId"
                          value={student.studentId}
                          disabled={true}
                        />
                      </div>
                      <div>
                        <Label htmlFor="major">Major</Label>
                        <Input
                          id="major"
                          name="major"
                          value={student.major}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Year</Label>
                        <Input
                          id="year"
                          name="year"
                          value={student.year}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gpa">GPA</Label>
                        <Input
                          id="gpa"
                          name="gpa"
                          value={student.gpa}
                          disabled={true}
                        />
                      </div>
                      <div>
                        <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                        <Input
                          id="enrollmentDate"
                          name="enrollmentDate"
                          value={student.enrollmentDate}
                          disabled={true}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expectedGraduation">Expected Graduation</Label>
                        <Input
                          id="expectedGraduation"
                          name="expectedGraduation"
                          value={student.expectedGraduation}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={student.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label>Current Courses</Label>
                      {student.courses.map((course, index) => (
                        <div key={index} className="flex items-center space-x-2 mt-2">
                          <BookOpen className="h-4 w-4" />
                          <span>{course.code} - {course.name} (Grade: {course.grade})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
      {isEditing && (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
    </div>
  )
}