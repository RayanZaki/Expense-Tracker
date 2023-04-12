import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { getSalary } from "../../../lib/utils/mongo/meta";

const GetBalance = async (req: Request, res: Response) => {
  if (req.method == "GET") {
    try {
      const balance = await getSalary();
      await res.send({
        success: true,
        balance: balance,
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

export default GetBalance;
