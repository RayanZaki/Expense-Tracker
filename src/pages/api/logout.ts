import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  await res.setHeader("Set-Cookie", serialize("TOKEN", "", { path: "/" }));
  await res.redirect("/login");
};

export default logout;
