import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email, resetToken, newPassword } = await req.json();

    if (!email || !resetToken || !newPassword) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    // Find the user with the matching email and reset token that is not expired
    const user = await usersCollection.findOne({
      email,
      resetToken,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired reset token" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and remove the reset token fields
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
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email, resetToken, newPassword } = await req.json();

    if (!email || !resetToken || !newPassword) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    // Find the user with the matching email and reset token that is not expired
    const user = await usersCollection.findOne({
      email,
      resetToken,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired reset token" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and remove the reset token fields
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