import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { transferFunds } from "../../../../lib/utils/mongo/meta";

const Transfer = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const browserCookie = cookie.parse(
        req ? req.headers.cookie || "" : document.cookie
      );
      const email = browserCookie["email"];
      // @ts-ignore
      const body: string = req.body;
      let { amount, receiverId } = JSON.parse(body);
      console.log(receiverId);
      if (amount == undefined) throw Error("missing parameters");

      const transfer = await transferFunds(Number(amount), email, receiverId);
      if (!transfer.success)
        res.status(401).send({
          success: false,
          message: transfer.message,
        });
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

export default Transfer;
