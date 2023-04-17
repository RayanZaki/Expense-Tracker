import mongoose from "mongoose";
import Users from "./Models/users";
import { deleteUserMetaData } from "./meta";

const jwt = require("jsonwebtoken");
mongoose.connect(process.env.MONGO_URI!).then(() => console.log("connected"));

export async function checkIfExists(email: string) {
  const users = await Users.find({ email: email });
  return users.length > 0;
}

export async function login(email: string, password: string) {
  if (!(await checkIfExists(email))) return false;
  const user = await Users.findOne({ email: email });
  return user;
}

export async function signUp(user: {
  email: string;
  password: string;
  username: string;
  subUser: boolean;
  parentUser: string | null;
}) {
  const newUser = user.subUser
    ? new Users({
        email: user.email,
        password: user.password,
        username: user.username,
        subUser: user.subUser,
        parentUser: user.parentUser,
      })
    : new Users({
        email: user.email,
        password: user.password,
        username: user.username,
        subUser: user.subUser,
      });
  return newUser.save();
}

export async function getUserId(email: string) {
  const res = await Users.findOne({ email: email });
  return res._id;
}

export async function getParentByID(id: string) {
  const res = await Users.findById(id);
  return res.parentUser;
}

export async function getUserName(token: string) {
  let User;
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => (User = user.username)
  );
  return User;
}

export async function isSubUser(token: string) {
  let User: any;
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => (User = user)
  );
  const res = await Users.findOne({ email: User.email });
  return res.subUser;
}
export async function isSubUserByEmail(email: string) {
  const res = await Users.findOne({ email: email });
  return res.subUser;
}

export async function isSubUserById(id: string) {
  const res = await Users.findById(id);
  return res.subUser;
}

export async function getSubUsers(token: string) {
  let id: any;
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => (id = user.id)
  );
  return Users.find({
    subUser: true,
    parentUser: id,
  });
}

export async function deleteSubUser(id: string) {
  await deleteUserMetaData(id);
  return Users.deleteOne({
    _id: id,
  });
}

export async function editSubUser(id: string, newUserName: string) {
  return Users.updateOne(
    {
      _id: id,
    },
    { username: newUserName }
  );
}
