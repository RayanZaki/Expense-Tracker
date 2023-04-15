import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
const logout = async (req: NextRequest, res: NextResponse) => {
  await res.setHeader("Set-Cookie", serialize("email", "", { path: "/" }));
  await res.redirect("/login");
};

export default logout;
