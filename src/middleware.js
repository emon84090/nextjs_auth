import { NextResponse } from "next/server";
import { VerifyToken } from "./utils/JWThelper";

export async function middleware(req, res) {
  try {
    let token = req.cookies.get("token");

    let payload = await VerifyToken(token["value"]);

    const requestHeader = new Headers(req.headers);
    requestHeader.set("email", payload["email"]);
    requestHeader.set("id", payload["id"]);
    return NextResponse.next({ request: { headers: requestHeader } });
  } catch (e) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/private"],
};
