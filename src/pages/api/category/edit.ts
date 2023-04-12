import { editCategory } from "../../../../lib/utils/mongo/categories";

const Update = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    try {
      const body = req.body;
      const { oldName, newName } = JSON.parse(body);
      if (oldName === null || newName === null)
        throw Error("oncorrect paramters");
      await editCategory(oldName, newName);
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
