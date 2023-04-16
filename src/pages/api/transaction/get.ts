import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { getTransactions } from "../../../../lib/utils/mongo/transaction";
import { getSize } from "../../../../lib/utils/mongo/meta";
import { getUserId } from "../../../../lib/utils/mongo/user";
import { NextApiRequest, NextApiResponse } from "next";

const Get = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      const { user, start } = req.query;
      if (user == undefined || status == undefined)
        throw Error("missing parameters");
      const userId = await getUserId(user as string);
      const size = await getSize(userId);
      const transactions = await getTransactions(Number(start), userId);
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
