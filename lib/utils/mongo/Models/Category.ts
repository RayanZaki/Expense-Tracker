import { odel, model, models, Schema, Model } from "mongoose";
import Modal from "@/Components/Utils/Modal";

let category: Model<any>;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
category = models.categories || model("categories", categorySchema);

export default category;
