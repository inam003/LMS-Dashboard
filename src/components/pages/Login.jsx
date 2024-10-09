import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <Card className="w-full max-w-sm mx-auto mt-52">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Login</CardTitle>
        <CardDescription>
          Enter your information to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter className="pb-3">
        <Button className="w-full">Login</Button>
      </CardFooter>
      <div className="text-center text-sm mb-4">
        Don't have an account?{" "}
        <Link to="/" className="underline font-semibold">
          Sign up
        </Link>
      </div>
    </Card>
  );
}
