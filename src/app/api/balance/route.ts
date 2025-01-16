import { NextResponse } from 'next/server';
import { createClient, getUserId } from "@/lib/appwrite";
import { Query } from 'node-appwrite';

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export async function GET(request: Request) {
    const userId = await getUserId();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  console.log("GET /api/balance called for user:", userId);
  try {
    const { databases } = await createClient();
    console.log("Appwrite client created successfully");

    if (!DATABASE_ID || !USER_COLLECTION_ID) {
      throw new Error("Database ID or Collection ID is missing");
    }

    const response = await databases.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );

    const balance = response.documents.reduce((sum, doc) => {
      return doc.type === 'income' ? sum + (doc.amount || 0) : sum - (doc.amount || 0);
    }, 0);

    console.log("Calculated balance:", balance);

    return NextResponse.json({ balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json({ error: "Failed to fetch balance", details: error.message }, { status: 500 });
  }
}

