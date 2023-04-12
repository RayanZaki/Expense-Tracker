import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { getId } from "../../../lib/utils/mongo/transaction";

const Get = async (req: Request, res: Response) => {
  if (req.method == "GET") {
    try {
      const meta = await getId();
      await res.send({
        success: true,
        meta: meta,
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
