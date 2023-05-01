import { deleteTransaction } from "../../../../lib/utils/mongo/transaction";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");
const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("hi")
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
        throw new Error("missing parameters");

      let userId: any;
      jwt.verify(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        (err: any, users: any) => (userId = users.id)
      );
      await deleteTransaction(id, type == "Expense", Number(amount), userId);
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
