import meta from "./Models/MetaData";

export async function updateSalary(expense: boolean, amount: number) {
  const metadata = await meta.find({});
  let newSalary: number = expense
    ? metadata[0].totalBalance - amount
    : metadata[0].totalBalance + amount;
  return meta.updateOne({ _id: metadata[0]._id }, { totalBalance: newSalary });
}

export async function getSalary() {
  const metadata = await meta.find({});
  return metadata[0].totalBalance;
}

export async function incrementCount() {
  const metadata = await meta.find({});
  let newNumber = metadata[0].numberOfTransactions + 1;
  await meta.updateOne(
    { _id: metadata[0]._id },
    { numberOfTransactions: newNumber }
  );
}
export async function decrementCount() {
  const metadata = await meta.find({});
  let newNumber = metadata[0].numberOfTransactions - 1;
  await meta.updateOne(
    { _id: metadata[0]._id },
    { numberOfTransactions: newNumber }
  );
}

export async function getSize() {
  try {
    const metadata = await meta.find({});
    return metadata[0].numberOfTransactions;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
