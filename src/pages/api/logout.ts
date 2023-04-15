import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
const logout = async (req: NextRequest, res: NextResponse) => {
  res.setHeader("Set-Cookie", serialize("email", "", { path: "/" }));
  res.setHeader("Set-Cookie", serialize("username", "", { path: "/" }));
  await res.redirect("/login");
};

export default logout;
