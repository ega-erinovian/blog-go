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
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        formData
      );

      // Handle any post-login logic (e.g., redirect, store token)
      const { token, username } = response.data;
      localStorage.setItem("token", token); // Example: Store token in localStorage

      // Show success toast
      toast({
        title: "Login Successful 🎉",
        description: `Welcome back, ${username}!`,
      });

      router.push("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      // Show error toast
      toast({
        title: "Login Failed ❌",
        description:
          err.response?.data.message ||
          "Invalid credentials. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Create a new account to start crafting word into something useful!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
}
