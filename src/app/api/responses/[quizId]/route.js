import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import Response from "@/models/Response";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Verify quiz ownership
    const quiz = await Quiz.findById(params.quizId);
    if (!quiz || quiz.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Quiz not found or unauthorized" },
        { status: 404 }
      );
    }

    const responses = await Response.find({ quizId: params.quizId }).sort({
      submittedAt: -1,
    });

    return NextResponse.json(responses);
  } catch (error) {
    console.error("Get responses error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
