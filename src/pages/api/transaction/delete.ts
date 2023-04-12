import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { deleteTransaction } from "../../../../lib/utils/mongo/transaction";

const Delete = async (req: Request, res: Response) => {
  if (req.method === "DELETE") {
    try {
      const body: string = req.body;
      const { id, type, amount } = await JSON.parse(body);
      await deleteTransaction(id, type == "Expense", amount);
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
