import { Schema, model, models, Model } from "mongoose";
import { Long, ObjectId } from "mongodb";
import { bool, number } from "prop-types";

let meta: Model<any>;
const metaDataSchema = new Schema({
  numberOfTransactions: {
    type: Number,
  },
  user: {
    type: ObjectId,
    required: true,
  },
  totalBalance: {
    type: Number,
  },
  globalBalance: {
    type: Number,
  },
});

meta = models.meta || model("meta", metaDataSchema);

export default meta;
