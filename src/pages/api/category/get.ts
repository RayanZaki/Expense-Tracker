import { showAllCategories } from "../../../../lib/utils/mongo/categories";
import { getUserId } from "../../../../lib/utils/mongo/user";

const Get = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    try {
      const { user } = req.query;
      if (user == undefined) throw Error("missing parameters");
      const cats = await showAllCategories(await getUserId(user));
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
