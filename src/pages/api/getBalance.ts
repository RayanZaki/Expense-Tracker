import { getSalary } from "../../../lib/utils/mongo/meta";
import { getUserId } from "../../../lib/utils/mongo/user";
import { NextApiRequest, NextApiResponse } from "next";

const GetBalance = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      const { user } = req.query;
      if (user == undefined) throw Error("missing parameters");
      const balance = await getSalary(await getUserId(user as string));
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
