import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { getTransactions } from "../../../../lib/utils/mongo/transaction";
import { getSize } from "../../../../lib/utils/mongo/meta";

const Get = async (req: Request, res: Response) => {
  if (req.method == "GET") {
    try {
      const size = await getSize();
      console.log(size);
      const start = req.query.start;
      const transactions = await getTransactions(start);
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
