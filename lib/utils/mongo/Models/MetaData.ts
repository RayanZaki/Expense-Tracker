import { Schema, model, models, Model } from "mongoose";
import { Long, ObjectId } from "mongodb";

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
