"use server";

import { ID, Query, TablesDB } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID, 
} = process.env;

export const createTransaction = async (transaction: CreateTransactionProps) => {
  try {
    const databaseId = DATABASE_ID;
    const tableId = TRANSACTION_COLLECTION_ID;

    if (!databaseId || !tableId) {
      throw new Error('Missing required environment variables: APPWRITE_DATABASE_ID or APPWRITE_TRANSACTION_TABLE_ID');
    }

    // Validate required fields
    const requiredFields: (keyof CreateTransactionProps)[] = [
      'name',
      'amount',
      'senderId',
      'senderBankId',
      'receiverId',
      'receiverBankId',
      'email',
    ];
    for (const field of requiredFields) {
      if (!transaction[field]) {
        throw new Error(`Missing required transaction field: ${field}`);
      }
    }

    console.log('Creating Transaction:', transaction); // Log for debugging

    const { tablesDB } = await createAdminClient();

    const newTransaction = await tablesDB.createRow({
      databaseId,
      tableId,
      rowId: ID.unique(),
      data: {
        channel: 'online',
        category: 'Transfer',
        ...transaction,
      },
    });

    return parseStringify(newTransaction);
  } catch (error) {
    console.error('Error creating transaction row:', error);
    throw error;
  }
};


export const getTransactionsByBankId = async ({ bankId }: getTransactionsByBankIdProps) => {
  try {
    const databaseId = DATABASE_ID;
    const tableId = TRANSACTION_COLLECTION_ID;

    if (!databaseId || !tableId) {
      throw new Error('Missing required environment variables: APPWRITE_DATABASE_ID or APPWRITE_TRANSACTION_COLLECTION_ID');
    }

    const { tablesDB } = await createAdminClient(); 

    const senderTransactions = await tablesDB.listRows({
      databaseId, 
      tableId,  
      queries: [Query.equal('senderBankId', bankId)],
    });

    const receiverTransactions = await tablesDB.listRows({
      databaseId,
      tableId,  
      queries: [Query.equal('receiverBankId', bankId)],
    });

    const transactions = {
      total: senderTransactions.total + receiverTransactions.total,
      documents: [
        ...senderTransactions.rows, 
        ...receiverTransactions.rows, 
      ],
    };

    return parseStringify(transactions);
  } catch (error) {
    console.error('Error retrieving transaction rows:', error);
    throw error; 
  }
};