import { ObjectId } from "mongodb";

export default interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  subUser: boolean;
  parentUser?: ObjectId;
}
