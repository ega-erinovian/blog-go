"use client";

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
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { useState } from "react";

// Define types for form data and API response
interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface APIResponse {
  message: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post<APIResponse>(
        "http://localhost:8000/auth/register",
        formData
      );

      // Show success message and clear form
      toast({
        title: "Registration Successful",
        description: response.data.message,
      });

      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      // Handle errors
      const err = error as AxiosError<{ message: string }>;
      toast({
        title: "Registration Failed",
        description: err.response?.data.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Create a new account to start crafting word into something useful!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                type="text"
                placeholder="What should we call you?"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="8 - 12 length please"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end"></CardFooter>
    </Card>
  );
};

export default RegisterForm;
