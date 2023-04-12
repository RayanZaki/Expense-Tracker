import mongoose from "mongoose";
import Transaction from "./Models/Transaction";
import { transaction } from "@/Interfaces/TransactionProps";
import { decrementCount, getId, incrementCount, updateSalary } from "./meta";

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("connected"));

export async function getTransactions(start: number) {
  start = start === undefined ? 0 : start;
  return Transaction.find({}).skip(start).limit(5);
}

export async function addTransaction(t: transaction) {
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
    incrementCount(),
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
