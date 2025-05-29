import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb.ts";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("test");
    await collection.insertOne({ hello: "world", date: new Date() });
    const docs = await collection.find({}).toArray();
    return NextResponse.json({ docs });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error connecting to database" }, { status: 500 });
  }
}