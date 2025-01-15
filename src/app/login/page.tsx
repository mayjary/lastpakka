"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGithub } from "react-icons/fa";
import { createSessionClient } from '@/lib/appwrite'

export default function LoginPage() {

  async function handleGithubLogin() {
    try {
      const { account } = await createSessionClient(); // Ensure this is connected to your server-side function
      await account.createSession(
        'github', // Provider name
        'http://localhost:3000', // Your redirect URL after authentication
      );
    } catch (error) {
      console.error('GitHub login failed:', error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to SpendSmart</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={handleGithubLogin} className='w-full'>
            Sign in using <FaGithub />
          </Button>
          <button className="w-full">Login</button>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
