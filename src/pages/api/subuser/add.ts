import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { checkIfExists, signUp } from "../../../../lib/utils/mongo/user";
import { createUserMetaData } from "../../../../lib/utils/mongo/meta";

const jwt = require("jsonwebtoken");
const Add = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    try {
      const body = req.body;
      const { email, username, password, subUser } = body;
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
      const parentAccessToken = browserCookie["TOKEN"];
      let id: any;
      jwt.verify(
        parentAccessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, user) => (id = user.id)
      );
      if (!exists) {
        const newUser = await signUp({
          email: email,
          username: username,
          password: password,
          subUser: true,
          parentUser: id,
        });
        await createUserMetaData(email);
        await res.status(302).redirect("/subuser");
      } else {
        await res.status(400).redirect("/subuser");
      }
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e.message, success: false });
      await res.status(400).redirect("/subuser");
    }
  } else {
    res.status(403).send({ message: "Bad method", success: false });
    await res.status(403).redirect("/signup");
  }
  return;
};

export default Add;
