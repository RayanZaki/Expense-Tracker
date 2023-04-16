import { Schema, model, models, Model } from "mongoose";
import { ObjectId } from "mongodb";
import { bool } from "prop-types";

let user: Model<any>;
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  subUser: { type: Boolean, required: false },
  parentUser: { type: ObjectId, required: false },
});

user = models.user || model("user", userSchema);

export default user;
