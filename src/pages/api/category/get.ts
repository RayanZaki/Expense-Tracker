import { showAllCategories } from "../../../../lib/utils/mongo/categories";
import { getUserId } from "../../../../lib/utils/mongo/user";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");
const Get = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { user } = req.query;
      if (user == undefined) throw Error("missing parameters");
      let id: string;
      jwt.verify(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => (id = user.id)
      );
      const cats = await showAllCategories(id);
      res.send({ categories: cats, success: true });
    } catch (e) {
      console.log(e);
      res.send({ message: e, success: false });
    }
  } else {
    res.status(403).send({ success: false });
  }
};

export default Get;
