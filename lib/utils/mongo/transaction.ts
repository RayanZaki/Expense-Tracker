import mongoose from "mongoose";
import Transaction from "./Models/Transaction";
import { transaction } from "@/Interfaces/TransactionProps";
import meta from "./Models/MetaData";
import { decrementCount, getId } from "./meta";

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("connected"));

export async function getTransactions() {
  return Transaction.find({});
}

export async function addTransaction(t: transaction) {
  // get the new index for the new transaction
  const index = await getId();

  // increment the number of transactions

  const newTransaction = new Transaction({
    title: t.title,
    type: t.type,
    date: t.date,
    category: t.category,
    amount: t.amount,
  });

  return await newTransaction.save();
}

export async function deleteTransaction(id: string) {
  await Transaction.deleteOne({ _id: id });
  await decrementCount();
}
