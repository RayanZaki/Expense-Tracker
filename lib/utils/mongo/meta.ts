import meta from "./Models/MetaData";
import MetaData from "./Models/MetaData";
import { getUserId, isSubUserById } from "./user";
import Users from "./Models/users";

export async function updateSalary(
  expense: boolean,
  amount: number,
  user: string
) {
  const metadata = await meta.findOne({ user: user });
  const currentSalary: number = metadata.totalBalance as number;
  let newSalary: number = expense
    ? currentSalary - amount
    : currentSalary + amount;

  if (await isSubUserById(user)) {
    const currentGlobalSalary: number = metadata.globalBalance as number;
    let newBalance: number = expense
      ? currentGlobalSalary - amount
      : currentGlobalSalary + amount;
    return meta.updateOne(
      { _id: metadata._id },
      { totalBalance: newSalary, globalBalance: newBalance }
    );
  }
  return meta.updateOne({ _id: metadata._id }, { totalBalance: newSalary });
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
