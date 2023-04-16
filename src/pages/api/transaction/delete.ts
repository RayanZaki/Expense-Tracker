import { deleteTransaction } from "../../../../lib/utils/mongo/transaction";
import { MongoInvalidArgumentError } from "mongodb";
import { getUserId } from "../../../../lib/utils/mongo/user";
import { NextApiRequest, NextApiResponse } from "next";

const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      const body: string = req.body;
      const { id, type, amount, user } = await JSON.parse(body);
      if (
        id == undefined ||
        type == undefined ||
        amount == undefined ||
        user == undefined
      )
        throw new MongoInvalidArgumentError("missing parameters");
      console.log(id, type, amount, user);
      await deleteTransaction(
        id,
        type == "Expense",
        amount as number,
        await getUserId(user)
      );
      res.send({ success: true });
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: e, success: false });
    }
  } else {
    res.status(403).send({ message: "bad method", success: false });
  }
};

export default Delete;
