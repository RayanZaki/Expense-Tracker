import { Request } from "next/dist/compiled/@edge-runtime/primitives/fetch";
import user from "../../../lib/utils/mongo/Models/users";
import { checkIfExists, signUp } from "../../../lib/utils/mongo/user";
import { useRouter } from "next/router";
import { serialize } from "cookie";

const GetBalance = async (req: Request, res: Response) => {
  if (req.method == "POST") {
    try {
      const body = req.body;
      const { email, username, password } = body;
      if (
        email == undefined ||
        username == undefined ||
        password == undefined
      ) {
        res.send({
          success: false,
          message: "undefined parameters",
        });
      }

      let exists: boolean = await checkIfExists(email);

      if (!exists) {
        const newUser = await signUp({
          email: email,
          username: username,
          password: password,
        });
        await res.setHeader(
          "Set-Cookie",
          serialize("username", username, { path: "/" })
        );
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

export default GetBalance;
