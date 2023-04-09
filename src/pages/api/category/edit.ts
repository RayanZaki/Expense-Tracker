import { GetServerSidePropsContext } from "next";
import {
  addCategory,
  editCategory,
} from "../../../../lib/utils/mongo/categories";

const Update = async (req: Request, res: Response) => {
  try {
    if (req.method === "POST") {
      const body = req.body;
      const { oldName, newName } = JSON.parse(body);
      if (oldName === null || newName === null)
        throw Error("oncorrect paramters");
      await editCategory(oldName, newName);
      res.send({ success: true });
    } else {
      res.status(405).send({ success: false });
    }
  } catch (e) {
    console.log(e);
  }
};

export default Update;
