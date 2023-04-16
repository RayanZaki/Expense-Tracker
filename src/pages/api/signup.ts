import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {
  checkIfExists,
  getUserId,
  signUp,
} from "../../../lib/utils/mongo/user";
import cookie, { serialize } from "cookie";
import { createUserMetaData } from "../../../lib/utils/mongo/meta";
import { NextApiRequest, NextApiResponse } from "next";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const body = req.body;
      const { email, username, password, subUser } = body;
      console.log(email, username, password, subUser);
      if (
        email == undefined ||
        username == undefined ||
        password == undefined ||
        subUser == undefined
      ) {
        await res.status(400).redirect("/signup");
      }

      let exists: boolean = await checkIfExists(email);
      const browserCookie = cookie.parse(req.headers.cookie || "");
      const parentEmail = browserCookie["email"];
      if (!exists) {
        const newUser = await signUp({
          email: email,
          username: username,
          password: password,
          subUser: subUser == "1",
          parentUser: subUser ? await getUserId(parentEmail) : "",
        });
        await createUserMetaData(await getUserId(email));
        await res.setHeader(
          "Set-Cookie",
          serialize("username", username, { path: "/" })
        );
        await res.setHeader(
          "Set-Cookie",
          serialize("email", email, { path: "/" })
        );

        await res.status(302).redirect("/");
      } else {
        await res.redirect("/signup");
      }
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e, success: false });
      await res.status(400).redirect("/signup");
    }
  } else {
    res.status(403).send({ message: "Bad method", success: false });
    await res.status(403).redirect("/signup");
  }
  return;
};

export default login;
