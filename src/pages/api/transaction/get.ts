import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { getTransactions } from "../../../../lib/utils/mongo/transaction";
import { getSize } from "../../../../lib/utils/mongo/meta";
import { getUserId } from "../../../../lib/utils/mongo/user";
import user from "../../../../lib/utils/mongo/Models/users";

const Get = async (req: Request, res: Response) => {
  if (req.method == "GET") {
    try {
      const { email, start } = req.query;
      const userId = await getUserId(email);
      const size = await getSize(userId);
      const transactions = await getTransactions(start, userId);
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
