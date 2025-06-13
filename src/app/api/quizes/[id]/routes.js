import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  console.log("this route hit");
  const { id } = params;

  try {
    const { db } = await connectToDatabase();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const quiz = await db.collection("quizzes");

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
