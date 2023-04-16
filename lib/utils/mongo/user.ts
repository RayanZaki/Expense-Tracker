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
  subUser: boolean;
  parentUser: string | null;
}) {
  console.log(user.subUser);
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

export async function getUserName(email: string) {
  const res = await Users.findOne({ email: email }).select("username");
  return res ? res.username : null;
}

export async function isSubUser(email: string) {
  const res = await Users.findOne({ email: email });
  return res.subUser;
}

export async function getSubUsers(email: string) {
  return Users.find({
    subUser: true,
    parentUser: await getUserId(email),
  });
}

export async function deleteSubUser(id: string) {
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
