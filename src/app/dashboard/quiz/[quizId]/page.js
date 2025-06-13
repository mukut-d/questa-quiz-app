"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Plus, Eye, Share2, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import userStore from "@/store/userStore";

export default function DashboardPage() {
  const { uid } = userStore();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      fetchQuizzes();
    }
  }, [uid]);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("/api/quizes");
      if (response.ok) {
        const data = await response.json();
        console.log("data " + JSON.stringify(data, null, 2));
        setQuizzes(data);
      }
    } catch (error) {
      toast.error("Failed to load quizzes");
    } finally {
      setIsLoading(false);
    }
  };

  const copyQuizLink = (quizId) => {
    const link = `${window.location.origin}/quiz/${quizId}`;
    navigator.clipboard.writeText(link);
    toast.success("Quiz link copied to clipboard!");
  };

  if (uid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8">
            <p>Please sign in to access your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, Mukut!</p>
            </div>
            <Button asChild>
              <Link href="/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Quiz
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading your quizzes...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No quizzes yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first quiz to get started!
              </p>
              <Button asChild>
                <Link href="/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Quiz
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz._id}>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{quiz.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {quiz.description || "No description"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      {quiz.questions.length} questions
                    </div>
                    <div className="text-xs text-gray-500">
                      Created {new Date(quiz.createdAt).toLocaleDateString()}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="flex-1"
                      >
                        <Link href={`/quiz/${quiz._id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyQuizLink(quiz._id)}
                        className="flex-1"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="flex-1"
                      >
                        <Link href={`/dashboard/quiz/${quiz._id}/responses`}>
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Results
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
