"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card.js";
import { PlusCircle, Share2, BarChart3, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import userStore from "./store/userStore";

export default function HomePage() {
  const router = useRouter();
  const { uid } = userStore();
  const handleCreateQuiz = (e) => {
    e.preventDefault();
    console.log("executed");

    if (uid) {
      toast.error("User needs to Login First !");

      router.push("/auth/signin");
    } else {
      router.push("/create");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">
                Questa Lite 🎯
              </h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" asChild>
                <Link href="/auth/signin" className="hover:bg-sky-600">
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup" className="hover:bg-sky-600">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create & Share
            <span className="text-indigo-600"> Quizzes</span>
            <br />
            Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build engaging quizzes in minutes and share them with anyone.
            Perfect for educators, trainers, and anyone who loves to create
            interactive content.
          </p>
          <div className="flex flex-col cursor-pointer  sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link
                href="/"
                className="hover:bg-sky-600"
                onClick={(e) => {
                  handleCreateQuiz(e);
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Your First Quiz
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/quiz/demo" className="hover:bg-sky-600">
                Try Demo Quiz
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center">
            <CardHeader>
              <PlusCircle className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <CardTitle>Easy Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create quizzes with multiple question types in just a few clicks
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Share2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Public Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Share your quizzes with anyone using a simple public link
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                View detailed responses and analytics for your quizzes
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your data is secure with our robust authentication system
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                Built by <strong>Mukutmani Das</strong>
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/mukut-d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 hover:bg-sky-600 p-2"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mukut-das/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 hover:bg-sky-600 p-2"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
