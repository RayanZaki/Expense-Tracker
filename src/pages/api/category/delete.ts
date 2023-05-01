import { deleteCategory } from "../../../../lib/utils/mongo/categories";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");

const Delete = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const body: string = req.body;
      if (body === null) throw Error("no category");
      const { category, user } = await JSON.parse(body);
      let id: any;
      jwt.verify(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        (err, users) => (id = users.id)
      );
      await deleteCategory(category, id);
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
