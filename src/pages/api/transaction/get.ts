import { getTransactions } from "../../../../lib/utils/mongo/transaction";
import { getSize } from "../../../../lib/utils/mongo/meta";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");
const Get = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      const { user, start } = req.query;
      if (user == undefined || start == undefined)
        throw Error("missing parameters");
      let id: string;
      jwt.verify(user, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        id = user.id;
      });
      const size = await getSize(id);
      const transactions = await getTransactions(Number(start), id);
      await res.send({
        success: true,
        transactions: transactions,
        size: size,
      });
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e, success: false });
    }
  } else {
    res.status(403).send({ message: "Bad method", success: false });
  }
  return;
};

export default Get;
