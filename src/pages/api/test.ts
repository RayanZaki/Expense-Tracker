import {
  addCategory,
  addTransaction,
  getCategoryId,
  getCategoryName,
  getTransactions,
} from "../../../lib/utils/mongo/ExpenseTracker";
import { transaction } from "@/Interfaces/TransactionProps";
import {
  Request,
  Response,
} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { RequestHandler } from "next/dist/server/next";
import { NextResponse } from "next/server";

const handler = async (req: Request, res: Response): Promise<any> => {
  // if( req.method === "GET") {
  //   try {
  //     let a = await getTransactions();
  //     res.send(a);
  //   } catch (e) {
  //     res.status(500).send({error: e});
  //   }
  // }
  if (req.method === "POST") {
    const { title, type, date, category, amount }: transaction =
      req.body as unknown as transaction;
    if (
      title === undefined ||
      type === undefined ||
      date === undefined ||
      category === undefined ||
      amount === undefined
    ) {
      res.status(400).send("incorrect parameters");
      return;
    }
    let id = await getCategoryName("6429e57f1b557e7e73519e75");
    console.log(id);
    try {
      // let a = await addTransaction({
      //   title: title,
      //   type: type,
      //   date: date,
      //   category: id,
      //   amount: amount,
      // });
      res.send(id);
    } catch (e) {
      res.status(500).send(e);
    }
  } else {
    res.status(404).send("no GET");
  }
};

async function getServerSideProps(context) {
  const page = context?.query?.page || "1";
  // Default value = "1"

  console.log("page is: ", page);
}

export default handler;
