import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Helper to generate a short readable ID (customizable)
function generateQuizId() {
  return `quiz_${Math.random().toString(36).substr(2, 9)}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, questions } = body;

    if (!title || questions.length < 2) {
      return NextResponse.json(
        { error: "Title and at least 2 questions are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const quizId = generateQuizId();

    const newQuiz = {
      quizId, // ✅ custom quizId
      title,
      description,
      questions,
      createdAt: new Date(),
    };

    const result = await db.collection("quizzes").insertOne(newQuiz);

    return NextResponse.json(
      {
        message: "Quiz created",
        _id: result.insertedId,
        quizId, // ✅ return it in response
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create Quiz Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const quizzes = await db.collection("quizzes").find().toArray();
    console.log(JSON.stringify(quizzes, null, 2));

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}
