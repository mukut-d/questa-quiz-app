// app/api/validate/route.js
import { NextResponse } from "next/server";
// import admin from "@/lib/firebase-admin"; // or your Firebase admin init
import admin from "firebase-admin";

const serviceAccount = require("@/serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function verifyFirebaseToken(req) {
  const authHeader = req.headers.get("authorization");

  console.log("authheader " + authHeader);

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

export default admin;
