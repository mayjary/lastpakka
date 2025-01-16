import { createClient } from "@/lib/appwrite";
import { Transaction } from "@/types/transaction";
import { ID } from "node-appwrite";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export async function getTransactions(): Promise<Transaction[]> {
    try {
      const { databases } = await createClient();
      const response = await databases.listDocuments(
        DATABASE_ID!,
        TRANSACTION_COLLECTION_ID!
      );
      console.log(response); // Check if data is fetched
      return response.documents.map((doc) => ({
        id: doc.$id,
        description: doc.description || "",
        amount: doc.amount || 0,
        type: doc.type || "income",
        category: doc.category || "",
        date: doc.date || "",
      }));
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }
  
export async function saveTransaction(transaction: Transaction): Promise<void> {
  const { databases } = await createClient();
  if (transaction.id) {
    await databases.updateDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      transaction.id,
      transaction
    );
  } else {
    await databases.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      transaction
    );
  }
}

export async function deleteTransaction(id: string): Promise<void> {
  const { databases } = await createClient();
  await databases.deleteDocument(DATABASE_ID!, TRANSACTION_COLLECTION_ID!, id);
}

