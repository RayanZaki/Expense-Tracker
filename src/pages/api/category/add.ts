import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { addCategory } from "../../../../lib/utils/mongo/categories";

const Add = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    try {
      // @ts-ignore
      console.log(req.body);
      const body: string = req.body;
      if (body === null) throw Error("no category");
      const { category } = await JSON.parse(body);
      await addCategory(category);
      res.send({ success: true });
    } catch (e) {
      console.log(e);
      res.status(200).send({ error: e, success: false });
    }
  } else {
    res.status(402).send({ error: { message: "bad method" }, success: false });
  }
};

export default Add;
