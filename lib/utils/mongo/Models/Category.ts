import { model, models, Schema, Model } from "mongoose";
import { ObjectId } from "mongodb";

let category: Model<any>;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
});
category = models.categories || model("categories", categorySchema);

export default category;
