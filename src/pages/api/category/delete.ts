import { deleteCategory } from "../../../../lib/utils/mongo/categories";
import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { getUserId } from "../../../../lib/utils/mongo/user";

const Delete = async (req: Request, res: Response) => {
  if (req.method === "DELETE") {
    try {
      const body: string = req.body;
      if (body === null) throw Error("no category");
      const { category, user } = await JSON.parse(body);
      await deleteCategory(category, await getUserId(user));
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
