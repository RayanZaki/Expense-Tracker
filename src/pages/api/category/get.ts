import { showAllCategories } from "../../../../lib/utils/mongo/categories";

const Get = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    try {
      const cats = await showAllCategories();
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
