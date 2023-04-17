import { addTransaction } from "../../../../lib/utils/mongo/transaction";
import cookie from "cookie";
import { getUserId } from "../../../../lib/utils/mongo/user";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");
const Get = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const browserCookie = cookie.parse(
        req ? req.headers.cookie || "" : document.cookie
      );
      // @ts-ignore
      const body: string = req.body;
      let { transaction } = JSON.parse(body);
      if (transaction === undefined) throw Error("missing parameters");
      const accessToken = browserCookie["TOKEN"];
      let id: any;
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, users) => (id = users.id)
      );
      transaction.owner = id;
      await addTransaction(transaction);
      res.send({
        success: true,
      });
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e.message, success: false });
    }
  } else {
    console.log("bad method");
    res.status(403).send({ message: "Bad method", success: false });
  }
  return;
};

export default Get;
