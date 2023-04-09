import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { getTransactions } from "../../../../lib/utils/mongo/transaction";

const Get = async (req: Request, res: Response) => {
  if (req.method == "GET") {
    const transactions = await getTransactions();
    await res.send({
      success: true,
      transactions: transactions,
    });
  } else {
    res.status(403).send({ error: "Bad method", success: false });
  }
  return;
};

export default Get;
