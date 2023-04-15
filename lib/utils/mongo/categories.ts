import Category from "@/../lib/utils/mongo/Models/Category";

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("connected"));

export async function getCategoryId(name: String, user: string) {
  return Category.findOne({ name: name, owner: user });
}

export async function addCategory(name: String, user: string) {
  const newCat = new Category({ name: name, owner: user });
  return newCat.save();
}

export async function getCategoryName(id: string) {
  return Category.findOne({ _id: id });
}

export async function showAllCategories(user: string) {
  return Category.find({ owner: user });
}

export async function editCategory(
  oldName: String,
  newName: String,
  user: string
) {
  return Category.updateOne(
    { owner: user, name: oldName },
    { owner: user, name: newName }
  );
}
export async function deleteCategory(name: string, user: string) {
  return Category.deleteOne({ name: name, owner: user });
}
