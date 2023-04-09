import { showAllCategories } from "../../../../lib/utils/mongo/categories";

const Get = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    const cats = await showAllCategories();
    res.send({ categories: cats, success: true });
  } else {
    res.status(404).send({ success: false });
  }
};

export default Get;
