import meta from "./Models/MetaData";
import MetaData from "./Models/MetaData";
import { getParentByID, getUserId, isSubUser, isSubUserById } from "./user";
import Users from "./Models/users";
import { number } from "prop-types";

export async function updateSalary(
  expense: boolean,
  amount: number,
  user: string
) {
  const metadata = await meta.findOne({ user: user });
  const currentSalary: number = metadata.totalBalance as number;
  let newSalary: number = expense
    ? Number(currentSalary) - Number(amount)
    : Number(currentSalary) + Number(amount);

  if (await isSubUserById(user)) {
    const parentUser: string = await getParentByID(user);
    const parentMeta = await meta.findOne({ user: parentUser });
    const currentGlobalSalary: number = parentMeta.globalBalance as number;
    let newBalance: number = expense
      ? Number(currentGlobalSalary) - Number(amount)
      : Number(currentGlobalSalary) + Number(amount);
    await meta.updateOne({ _id: metadata._id }, { totalBalance: newSalary });
    await parentMeta.updateOne({ globalBalance: newBalance });
    return;
  }
  const currentGlobalSalary: number = metadata.globalBalance as number;
  let newBalance: number = expense
    ? Number(currentGlobalSalary) - Number(amount)
    : Number(currentGlobalSalary) + Number(amount);
  return meta.updateOne(
    { _id: metadata._id },
    { totalBalance: newSalary, globalBalance: newBalance }
  );
}

export async function getSalary(user: string) {
  const metadata = await meta.findOne({ user: user });
  return metadata.totalBalance;
}

export async function incrementCount(user: string) {
  const metadata = await meta.find({ user: user });
  let newNumber = metadata[0].numberOfTransactions + 1;
  await meta.updateOne(
    { _id: metadata[0]._id },
    { numberOfTransactions: newNumber }
  );
}
export async function decrementCount(user: string) {
  const metadata = await meta.find({ user: user });
  let newNumber = metadata[0].numberOfTransactions - 1;
  await meta.updateOne(
    { _id: metadata[0]._id },
    { numberOfTransactions: newNumber }
  );
}

export async function getSize(user: string) {
  try {
    const metadata = await meta.findOne({ user: user });
    return metadata.numberOfTransactions;
  } catch (e) {
    console.log(e);
  }
}

export async function createUserMetaData(user: string) {
  try {
    const metadata = new MetaData({
      user: await getUserId(user),
      numberOfTransactions: 0,
      totalBalance: 0,
      globalBalance: 0,
    });
    return metadata.save();
  } catch (e) {
    console.log(e);
  }
}

export async function getGlobalBalance(email: string) {
  const metaData = await meta.findOne({ user: await getUserId(email) });
  return metaData.globalBalance;
}

export async function transferFunds(
  amount: number,
  email: string,
  receiverId?: string
) {
  try {
    if (amount < 0) return { success: false, message: "Negative amount" };
    const id = await getUserId(email);
    if (await isSubUser(email)) {
      const metadata = await meta.findOne({ user: id });
      if (metadata.totalBalance < amount)
        return { success: false, message: "Amount Exceeds balance" };
      await updateSalary(true, amount, id);
      const parentUser = await getParentByID(id);
      await updateSalary(false, amount, parentUser);
      return { success: true };
    } else {
      const metaData = await meta.findOne({ user: id });
      if (metaData.totalBalance < amount)
        return { success: false, message: "Amount Exceeds balance" };
      await updateSalary(true, amount, id);
      await updateSalary(false, amount, receiverId!);
      return { success: true };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "Server Error" };
  }
}
