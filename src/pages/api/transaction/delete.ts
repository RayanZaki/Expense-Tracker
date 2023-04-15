import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { deleteTransaction } from "../../../../lib/utils/mongo/transaction";
import Error from "next/error";
import { MongoInvalidArgumentError } from "mongodb";
import { getUserId } from "../../../../lib/utils/mongo/user";

const Delete = async (req: Request, res: Response) => {
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
