import { editCategory } from "../../../../lib/utils/mongo/categories";
import { getUserId } from "../../../../lib/utils/mongo/user";
import { NextApiRequest, NextApiResponse } from "next";

const Update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const body = req.body;
      const { oldName, newName, user } = JSON.parse(body);
      if (oldName === undefined || newName === undefined || user == undefined)
        throw Error("Incorrect parameters");
      await editCategory(oldName, newName, await getUserId(user));
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
