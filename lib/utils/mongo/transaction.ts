import mongoose from "mongoose";
import Transaction from "./Models/Transaction";
import { transaction } from "@/Interfaces/TransactionProps";

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("connected"));

export async function getTransactions() {
  return Transaction.find({});
}

export async function addTransaction({
  title,
  type,
  date,
  category,
  amount,
}: transaction) {
  const newTransaction = new Transaction({
    title,
    type,
    date,
    category,
    amount,
  });

  return newTransaction.save();
}
