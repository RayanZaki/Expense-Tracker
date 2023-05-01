import { editCategory } from "../../../../lib/utils/mongo/categories";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");
const Update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const body = req.body;
      const { oldName, newName, user } = JSON.parse(body);
      if (oldName === undefined || newName === undefined || user == undefined)
        throw Error("Incorrect parameters");

      let id: any;
      jwt.verify(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        (err, users) => (id = users.id)
      );
      await editCategory(oldName, newName, id);
      res.send({ success: true });
    } catch (e) {
      console.log(e);
      res.send({ message: e, success: false });
    }
  } else {
    res.status(405).send({ message: "bad method", success: false });
  }
};

export default Update;
