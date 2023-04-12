import mongoose from "mongoose";
import Transaction from "./Models/Transaction";
import { transaction } from "@/Interfaces/TransactionProps";
import { decrementCount, getId, updateSalary } from "./meta";

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

  return await Promise.all([
    newTransaction.save(),
    updateSalary(t.type == "Expense", t.amount),
  ]);
}

export async function deleteTransaction(
  id: string,
  expense: boolean,
  amount: number
) {
  await Promise.all([
    decrementCount(),
    Transaction.deleteOne({ _id: id }),
    updateSalary(!expense, amount),
  ]);
}
