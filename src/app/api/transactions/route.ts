import { NextResponse } from 'next/server';
import { createClient } from "@/lib/appwrite";
import { Transaction } from "@/types/transaction";
import { ID } from 'node-appwrite';

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export async function GET() {
  try {
    const { databases } = await createClient();
    const response = await databases.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!
    );
    const transactions: Transaction[] = response.documents.map((doc) => ({
      id: doc.$id,
      description: doc.description || "",
      amount: doc.amount || 0,
      type: doc.type || "income",
      category: doc.category || "",
      date: doc.date || "",
    }));
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { databases } = await createClient();
    const transaction: Transaction = await request.json();
    
    if (transaction.id) {
      await databases.updateDocument(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        transaction.id,
        transaction
      );
    } else {
      await databases.createDocument(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        ID.unique(),
        transaction
      );
    }
    return NextResponse.json({ message: "Transaction saved successfully" });
  } catch (error) {
    console.error("Error saving transaction:", error);
    return NextResponse.json({ error: "Failed to save transaction" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { databases } = await createClient();
    const { id } = await request.json();
    await databases.deleteDocument(DATABASE_ID!, USER_COLLECTION_ID!, id);
    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}

