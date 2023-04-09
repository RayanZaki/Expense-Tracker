import Category from "@/../lib/utils/mongo/Models/Category";

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("connected"));

export async function getCategoryId(name: String) {
  return Category.findOne({ name: name });
}

export async function addCategory(name: String) {
  const newCat = new Category({ name: name });
  return newCat.save();
}

export async function getCategoryName(id: string) {
  return Category.findOne({ _id: id });
}

export async function showAllCategories() {
  return Category.find({});
}

export async function editCategory(oldName: String, newName: String) {
  return Category.updateOne({ name: oldName }, { name: newName });
}
export async function deleteCategory(name: String) {
  return Category.deleteOne({ name: name });
}
