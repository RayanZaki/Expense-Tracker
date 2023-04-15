import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { addCategory } from "../../../../lib/utils/mongo/categories";
import { getUserId } from "../../../../lib/utils/mongo/user";

const Add = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    try {
      // @ts-ignore
      const body: string = req.body;
      if (body === undefined) throw Error("no category");
      const { category, user } = await JSON.parse(body);
      await addCategory(category, await getUserId(user));
      res.send({ success: true });
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e, success: false });
    }
  } else {
    res.status(402).send({ message: "bad method", success: false });
  }
};

export default Add;
