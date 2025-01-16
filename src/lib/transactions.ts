import { ID, Query } from 'node-appwrite';
import { createAdminClient } from './appwrite';
import { Transaction } from '@/types/transaction';
import { parseStringify } from './utils';

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export interface CreateTransactionProps {
  userId: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export const createTransaction = async ({
  userId,
  description,
  amount,
  type,
  category,
  date,
}: CreateTransactionProps): Promise<Transaction | undefined> => {
  try {
    const { database } = await createAdminClient();

    const transaction = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        description,
        amount,
        type,
        category,
        date,
      }
    );

    return parseStringify(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    return undefined;
  }
};

export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      description: doc.description,
      amount: doc.amount,
      type: doc.type,
      category: doc.category,
      date: doc.date,
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

