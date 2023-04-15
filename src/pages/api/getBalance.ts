import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import { getSalary } from "../../../lib/utils/mongo/meta";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "../../../lib/utils/mongo/user";

const GetBalance = async (req: NextRequest, res: NextResponse) => {
  if (req.method == "GET") {
    try {
      const { user } = req.query;
      const balance = await getSalary(await getUserId(user));
      await res.send({
        success: true,
        balance: balance,
      });
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e, success: false });
    }
  } else {
    res.status(403).send({ message: "Bad method", success: false });
  }
  return;
};

export default GetBalance;
