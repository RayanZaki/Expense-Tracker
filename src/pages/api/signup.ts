import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {
  checkIfExists,
  getUserId,
  signUp,
} from "../../../lib/utils/mongo/user";
import { serialize } from "cookie";
import { createUserMetaData } from "../../../lib/utils/mongo/meta";

const login = async (req: Request, res: Response) => {
  if (req.method == "POST") {
    try {
      const body = req.body;
      const { email, username, password } = body;
      if (
        email == undefined ||
        username == undefined ||
        password == undefined
      ) {
        await res.redirect("/signup");
      }

      let exists: boolean = await checkIfExists(email);

      if (!exists) {
        const newUser = await signUp({
          email: email,
          username: username,
          password: password,
        });
        await createUserMetaData(await getUserId(email));
        res.setHeader(
          "Set-Cookie",
          serialize("username", username, { path: "/" })
        );
        res.setHeader("Set-Cookie", serialize("email", email, { path: "/" }));

        await res.status(302).redirect("/");
      } else {
        await res.redirect("/signup");
      }
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e, success: false });
    }
  } else {
    res.status(403).send({ message: "Bad method", success: false });
  }
  return;
};

export default login;
