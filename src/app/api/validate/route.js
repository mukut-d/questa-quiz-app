// app/api/validate/route.js
import { NextResponse } from "next/server";
import admin from "@/lib/firebase-admin"; // or your Firebase admin init

export async function GET(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ msg: "Token not found" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return NextResponse.json({ data: decoded }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 403 });
  }
}
