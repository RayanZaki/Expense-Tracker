import { Schema, model, models, Model } from "mongoose";
import { ObjectId } from "mongodb";
import { number } from "prop-types";

let transaction: Model<any>;
const transactionSchema = new Schema({
  owner: {
    type: ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    required: true,
    type: Number,
  },
  date: {
    type: String,
  },
  category: {
    required: true,
    type: ObjectId,
    ref: "Category",
  },
  type: {
    type: String,
    enum: ["Expense", "Revenue"],
    required: true,
  },
});

transaction = models.transaction || model("transaction", transactionSchema);

export default transaction;
