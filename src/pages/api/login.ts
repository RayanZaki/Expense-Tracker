import { getUserId, getUserName, login } from "../../../lib/utils/mongo/user";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import cookie from "cookie";
const Login = async (req: NextRequest, res: NextResponse) => {
  if (req.method == "POST") {
    try {
      const body = req.body;
      const { email, password } = body;
      if (email == undefined || password == undefined) {
        res.status(401).redirect("/login");
      }

      let exists: boolean = await login(email, password);
      if (exists) {
        const username = await getUserName(email);
        await res.setHeader(
          "Set-Cookie",
          serialize("email", email, { path: "/" })
        );
        await res.setHeader(
          "Set-Cookie",
          serialize("username", username, { path: "/" })
        );
        await res.redirect("/");
      } else {
        await res.status(401).redirect("/login");
      }
    } catch (e) {
      console.log(e);
      res.status(401).redirect("/login");
    }
  } else {
    res.status(500).redirect("/login");
  }
  return;
};

export default Login;
