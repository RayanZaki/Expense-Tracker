import { Schema, model, models, Model } from "mongoose";
import { ObjectId } from "mongodb";

let transaction: Model<any>;
const transactionSchema = new Schema({
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
