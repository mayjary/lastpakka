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

  console.log("GET /api/income-expense called for user:", userId);
  try {
    const { databases } = await createClient();
    console.log("Appwrite client created successfully");

    if (!DATABASE_ID || !USER_COLLECTION_ID) {
      throw new Error("Database ID or Collection ID is missing");
    }

    const incomeResponse = await databases.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.equal("userId", userId), Query.equal("type", "income")]
    );

    const expenseResponse = await databases.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.equal("userId", userId), Query.equal("type", "expense")]
    );

    const income = incomeResponse.documents.reduce((sum, doc) => sum + (doc.amount || 0), 0);
    const expense = expenseResponse.documents.reduce((sum, doc) => sum + (doc.amount || 0), 0);

    console.log("Calculated income/expense:", { income, expense });

    return NextResponse.json({ income, expense });
  } catch (error) {
    console.error("Error fetching income/expense data:", error);
    return NextResponse.json({ error: "Failed to fetch income/expense data", details: error.message }, { status: 500 });
  }
}

