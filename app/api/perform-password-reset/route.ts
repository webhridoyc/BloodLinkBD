// src/services/auth/resetPasswordHandler.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function resetPasswordHandler(req: NextRequest) {
  try {
    const { email, resetToken, newPassword } = await req.json();

    if (!email || !resetToken || !newPassword) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      email,
      resetToken,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: { passwordHash: hashedPassword },
        $unset: { resetToken: "", resetTokenExpiry: "" },
      }
    );

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
