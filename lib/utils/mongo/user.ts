import mongoose from "mongoose";
import Users from "./Models/users";

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("connected"));

export async function checkIfExists(email: string) {
  const users = await Users.find({ email: email });
  return users.length > 0;
}

export async function login(email: string, password: string) {
  if (!(await checkIfExists(email))) return false;
  const userPassword = await Users.findOne({ email: email }).select("password");
  return password == userPassword.password;
}

export async function signUp(user: {
  email: string;
  password: string;
  username: string;
}) {
  const newUser = new Users({
    email: user.email,
    password: user.password,
    username: user.username,
  });
  return newUser.save();
}

export async function getUserName(email: string) {
  if (!(await checkIfExists(email))) return;
  const res = await Users.findOne({ email: email }).select("username");
  return res.username;
}
