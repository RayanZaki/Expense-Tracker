import { getSalary } from "../../../lib/utils/mongo/meta";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");
const GetBalance = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    try {
      const { user } = req.query;
      if (user == undefined) throw Error("missing parameters");
      let id: string = "";
      jwt.verify(user, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        id = user.id;
      });
      const balance = await getSalary(id);
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
