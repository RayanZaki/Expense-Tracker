import { getUserName, login } from "../../../lib/utils/mongo/user";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const body = req.body;
      const { email, password } = body;
      if (email == undefined || password == undefined) {
        res.status(401).redirect("/login");
      }

      let user = await login(email, password);
      const currentUser = {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      };
      if (user.password === password) {
        const accessToken = jwt.sign(
          currentUser,
          process.env.ACCESS_TOKEN_SECRET
        );
        await res.setHeader(
          "Set-Cookie",
          serialize("TOKEN", accessToken, { path: "/" })
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
};

export default Login;
