import Transaction from "@/../lib/utils/mongo/Models/Transaction";
import Category from "@/../lib/utils/mongo/Models/Category";

import mongoose from "mongoose";
import { transaction } from "@/Interfaces/TransactionProps";

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("connected"));

export async function getTransactions() {
  const result = await Transaction.find({});

  return { transactions: result };
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

  await newTransaction.save();
  return { transactions: newTransaction };
}

export async function getCategoryId(name: String) {
  try {
    return await Category.findOne({ name: name });
  } catch (e) {
    console.log("error");
  }
}

export async function addCategory(name: String) {
  const newCat = new Category({ name: name });
  await newCat.save();
}

export async function getCategoryName(id: string) {
  try {
    return await Category.findOne({ _id: id });
  } catch (e) {
    console.log(e);
  }
}

export async function showAllCategories() {
  try {
    return await Category.find({});
  } catch (e) {
    console.log(e);
  }
}

export async function editCategory(oldName: String, newName: String) {
  return await Category.updateOne({ name: oldName }, { name: newName });
}
export async function deleteCategory(name: String) {
  await Category.deleteOne({ name: name });
}
