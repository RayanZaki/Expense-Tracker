import { editTransaction } from "../../../../lib/utils/mongo/transaction";
import cookie from "cookie";
import { getUserId } from "../../../../lib/utils/mongo/user";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");
const Edit = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const browserCookie = cookie.parse(
        req ? req.headers.cookie || "" : document.cookie
      );
      // @ts-ignore
      const body: string = req.body;
      let { transaction } = JSON.parse(body);
      if (transaction === undefined) throw Error("missing params");
      let userId: any;
      const accessToken = browserCookie["TOKEN"];
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, users) => (userId = users.id)
      );
      const transactionOwner = userId;
      await editTransaction(transaction, transactionOwner);
      res.send({
        success: true,
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

export default Edit;
