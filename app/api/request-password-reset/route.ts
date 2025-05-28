import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Basic validation
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // Replace with your database name if different
    const usersCollection = db.collection("users"); // Replace with your users collection name if different

    const user = await usersCollection.findOne({ email: email });

    // For security, we return a success message even if the user doesn't exist
    // This prevents exposing whether an email is registered or not.
    if (!user) {
      console.warn(`Password reset requested for non-existent email: ${email}`);
      // Placeholder for sending a fake email or doing nothing to prevent timing attacks
      // In a real application, you might still send a generic "if an account exists..." email
      return NextResponse.json({ message: "If an account with that email exists, we sent a password reset link." }, { status: 200 });
    }

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Update user document with reset token and expiry
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { resetToken: resetToken, resetTokenExpiry: resetTokenExpiry } }
    );

    // Construct the password reset link
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // TODO: Implement email sending logic here
    console.log(`Sending password reset email to ${email} with link: ${resetLink}`);
    // Example placeholder for sending email (replace with your actual email sending code)
    // await sendPasswordResetEmail(email, resetLink);

    return NextResponse.json({ message: "If an account with that email exists, we sent a password reset link." }, { status: 200 });

  } catch (error) {
    console.error("Error requesting password reset:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Placeholder for email sending function (replace with your implementation)
async function sendPasswordResetEmail(email: string, resetLink: string): Promise<void> {
  // Implement your email sending logic here using Nodemailer, SendGrid, etc.
  // This is just a placeholder
  console.log(`--- Email Sending Placeholder ---`);
  console.log(`To: ${email}`);
  console.log(`Subject: Password Reset Request`);
  console.log(`Body: Click the following link to reset your password: ${resetLink}`);
  console.log(`--------------------------------`);
}