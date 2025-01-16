import { NextResponse } from 'next/server';
import { createClient, getUserId } from "@/lib/appwrite";
import { Transaction } from "@/types/transaction";
import { ID, Query } from 'node-appwrite';

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export async function GET(request: Request) {
  const userId = await getUserId();
  console.log("session id: ", userId);
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  console.log("GET /api/transactions called for user:", userId);
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
    console.log("Raw response from Appwrite:", JSON.stringify(response, null, 2));

    if (!response.documents) {
      throw new Error("No documents property in the response");
    }

    console.log("Number of documents fetched:", response.documents.length);

    const transactions: Transaction[] = response.documents.map((doc) => ({
      id: doc.$id,
      description: doc.description || "",
      amount: doc.amount || 0,
      type: doc.type || "income",
      category: doc.category || "",
      date: doc.date || "",
    }));

    console.log("Processed transactions:", JSON.stringify(transactions, null, 2));

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions", details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const transaction: Transaction = await request.json();
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  console.log("POST /api/transactions called for user:", userId);
  try {
    const { databases } = await createClient();
    console.log("Received transaction:", transaction);
    
    if (!DATABASE_ID || !USER_COLLECTION_ID) {
      throw new Error("Database ID or Collection ID is missing");
    }

    const newDoc = await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      ID.unique(),
      {
        ...transaction,
        userId: userId
      }
    );
    console.log("New transaction created with ID:", newDoc.$id);
    return NextResponse.json({ message: "Transaction saved successfully", id: newDoc.$id });
  } catch (error) {
    console.error("Error saving transaction:", error);
    return NextResponse.json({ error: "Failed to save transaction", details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const userId = await getUserId();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  console.log("DELETE /api/transactions called for user:", userId);
  try {
    const { databases } = await createClient();
    console.log("Deleting transaction with ID:", id);
    
    if (!DATABASE_ID || !USER_COLLECTION_ID) {
      throw new Error("Database ID or Collection ID is missing");
    }

    await databases.deleteDocument(DATABASE_ID, USER_COLLECTION_ID, id);
    console.log("Transaction deleted successfully");
    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json({ error: "Failed to delete transaction", details: error.message }, { status: 500 });
  }
}

