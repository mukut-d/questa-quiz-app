import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  console.log("executed");
  try {
    const body = await req.json();

    const { quizId, answers } = body;
    console.log("quiz id " + quizId);

    if (!quizId || !answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid data" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    const responseDoc = {
      quizId,
      answers,
      submittedAt: new Date(),
    };

    const result = await db.collection("responses").insertOne(responseDoc);

    return NextResponse.json(
      {
        message: "Response submitted successfully",
        responseId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving response:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
