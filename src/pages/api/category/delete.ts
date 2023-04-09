import React from "react";
import {
  addCategory,
  deleteCategory,
} from "../../../../lib/utils/mongo/categories";
import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";

const Delete = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    try {
      const body: string = req.body;
      if (body === null) throw Error("no category");
      const { category } = await JSON.parse(body);
      await deleteCategory(category);
      res.send({ success: true });
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: e, success: false });
    }
  } else {
    res.status(403).send({ error: { message: "bad method" }, success: false });
  }
};

export default Delete;
