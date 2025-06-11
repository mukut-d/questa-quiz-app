import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Response from "@/models/Response";

export async function POST(request) {
  try {
    const { quizId, answers } = await request.json();

    if (!quizId || !answers || answers.length === 0) {
      return NextResponse.json(
        { message: "Quiz ID and answers are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const response = await Response.create({
      quizId,
      answers,
      ipAddress: request.ip || "unknown",
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Submit response error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
