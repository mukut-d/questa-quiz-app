// app/api/quiz/[id]/combined/route.js
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();

    const quiz = await db
      .collection("quizzes")
      .findOne({ _id: new ObjectId(id) });
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const responses = await db
      .collection("responses")
      .find({ quizId: id })
      .sort({ submittedAt: -1 })
      .toArray();

    console.log("ID:", id);
    console.log("Quiz:", quiz);
    console.log("Responses:", responses);

    return NextResponse.json({ quiz, responses });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
