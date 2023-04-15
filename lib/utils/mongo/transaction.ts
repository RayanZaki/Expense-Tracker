import mongoose from "mongoose";
import Transaction from "./Models/Transaction";
import { transaction } from "@/Interfaces/TransactionProps";
import { decrementCount, incrementCount, updateSalary } from "./meta";

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("connected"));

export async function getTransactions(start: number, user: string) {
  start = start === undefined ? 0 : start;
  console.log(user);
  return Transaction.find({ owner: user }).skip(start).limit(5);
}
export async function addTransaction(t: transaction) {
  // increment the number of transactions

  const newTransaction = new Transaction({
    owner: t.owner,
    title: t.title,
    type: t.type,
    date: t.date,
    category: t.category,
    amount: t.amount,
  });

  return Promise.all([
    newTransaction.save(),
    updateSalary(t.type == "Expense", t.amount as number, t.owner),
    incrementCount(t.owner),
  ]);
}

export async function deleteTransaction(
  id: string,
  expense: boolean,
  amount: number,
  user: string
) {
  await Promise.all([
    decrementCount(user),
    Transaction.deleteOne({ _id: id, owner: user }),
    updateSalary(!expense, amount, user),
  ]);
}
