import { editSubUser } from "../../../../lib/utils/mongo/user";
import { NextApiRequest, NextApiResponse } from "next";

const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const body: string = req.body;
      if (body === null) throw Error("no id");
      const { id, NewUserName } = await JSON.parse(body);
      await editSubUser(id, NewUserName);
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
