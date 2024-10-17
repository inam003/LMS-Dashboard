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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";

const teacherData = {
  name: "Muhammad Inam Aslam",
  email: "teacher@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Education St, Knowledge City, 12345",
  department: "Computer Science",
  title: "Associate Professor",
  bio: "Passionate educator with 10+ years of experience in teaching computer science. Specializes in AI and machine learning.",
  education: [
    {
      degree: "Ph.D. in Computer Science",
      institution: "Tech University",
      year: 2010,
    },
    {
      degree: "M.S. in Computer Science",
      institution: "Innovation College",
      year: 2005,
    },
  ],
  avatar: "../../../../public/ava1.avif",
  notificationPreferences: {
    email: true,
    sms: false,
    inApp: true,
  },
};

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(teacherData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving profile:", teacher);
    setIsEditing(false);
  };
  return (
    <div className="my-10 mx-9 md:ml-64">
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Teacher Profile</CardTitle>
              <CardDescription>
                View and manage your personal information
              </CardDescription>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-y-8">
              <div className="flex items-center justify-center">
                <Avatar className="size-48 mx-8">
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback>
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="mt-4 text-center">
                    <Label
                      htmlFor="avatar-upload"
                      className="cursor-pointer text-blue-500 hover:text-blue-600"
                    >
                      Change Avatar
                    </Label>
                    <Input id="avatar-upload" type="file" className="hidden" />
                  </div>
                )}
              </div>
              <div className="md:w-2/3">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="professional">
                      Professional Info
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={teacher.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            value={teacher.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={teacher.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={teacher.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="professional">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          name="department"
                          value={teacher.department}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={teacher.title}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={teacher.bio}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label>Education</Label>
                        {teacher.education.map((edu, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 mt-2"
                          >
                            <GraduationCap className="h-4 w-4" />
                            <span>
                              {edu.degree} - {edu.institution}, {edu.year}
                            </span>
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
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
