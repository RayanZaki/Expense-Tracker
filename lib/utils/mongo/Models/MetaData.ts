import { Schema, model, models, Model } from "mongoose";
import { ObjectId } from "mongodb";
import { number } from "prop-types";

let meta: Model<any>;
const metaDataSchema = new Schema({
  numberOfTransactions: {
    type: Number,
  },
  user: {
    type: String,
  },
  latestIndex: {
    type: Number,
  },
  totalBalance: {
    type: Number,
  },
});

meta = models.meta || model("meta", metaDataSchema);

export default meta;
