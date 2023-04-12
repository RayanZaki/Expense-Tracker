import meta from "./Models/MetaData";

export async function getId() {
  const metadata = await meta.find({});
  let newId = metadata[0].latestIndex + 1;
  let number = metadata[0].numberOfTransactions + 1;

  await meta.updateOne(
    { _id: metadata[0]._id },
    { latestIndex: newId, numberOfTransactions: number }
  );
  return newId;
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
