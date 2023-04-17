import { checkIfExists, signUp } from "../../../lib/utils/mongo/user";
import cookie, { serialize } from "cookie";
import { createUserMetaData } from "../../../lib/utils/mongo/meta";
import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");
const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const body = req.body;
      const { email, username, password } = body;
      if (
        email == undefined ||
        username == undefined ||
        password == undefined
      ) {
        await res.status(400).redirect("/signup");
        return;
      }

      let exists: boolean = await checkIfExists(email);
      if (!exists) {
        const newUser = await signUp({
          email: email,
          username: username,
          password: password,
          subUser: false,
          parentUser: "",
        });
        await createUserMetaData(email);
        const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET);
        await res.setHeader(
          "Set-Cookie",
          serialize("TOKEN", accessToken, { path: "/" })
        );

        await res.status(302).redirect("/");
      } else {
        await res.redirect("/signup");
      }
    } catch (e) {
      console.log(e);
      res.status(500).redirect("/signup");
    }
  } else {
    res.status(403).redirect("/signup");
  }
};

export default login;
