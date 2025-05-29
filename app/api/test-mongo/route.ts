import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
 return NextResponse.json({ message: "MongoDB functionality removed" });
  }
}