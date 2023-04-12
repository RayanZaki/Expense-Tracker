import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { addTransaction } from "../../../../lib/utils/mongo/transaction";
import { transaction } from "@/Interfaces/TransactionProps";

const Get = async (req: Request, res: Response) => {
  if (req.method == "POST") {
    try {
      // @ts-ignore
      const body: string = req.body;
      const { transaction } = JSON.parse(body);
      await addTransaction(transaction);
      res.send({
        success: true,
      });
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e, success: false });
    }
  } else {
    console.log("bad method");
    res.status(403).send({ message: "Bad method", success: false });
  }
  return;
};

export default Get;
