import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";
import { createToken } from "@/utils/JWThelper";

export async function POST(req, res) {
  try {
    let reqBody = await req.json();
    const prisma = new PrismaClient();
    const result = await prisma.user.findUnique({
      where: {
        email: reqBody["email"],
      },
    });

    if (!result) {
      return NextResponse.json({
        status: "fail",
        data: result,
        message: "email not registared",
      });
    }

    const checkpassword = bcrypt.compareSync(
      reqBody["password"],
      result["password"]
    );

    if (!checkpassword) {
      return NextResponse.json(
        {
          status: "fail",
          message: "password wrong",
        },
        { status: 401 }
      );
    }

    let token = await createToken(result["id"], result["email"]);

    let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const cookieString = `token=${token}; expires=${expireDuration.toUTCString()} ;path=/`;

    return NextResponse.json(
      { status: "success", data: token },
      { status: 200, headers: { "set-cookie": cookieString } }
    );
  } catch (err) {
    return NextResponse.json({
      status: false,
      message: err?.message || "something went wrong",
    });
  }
}

export async function GET(req,res) {
  let expireDuration=new Date(Date.now() - 24*60*60*1000 );
  const response = NextResponse.redirect(new URL('/', req.url),303);
  response.cookies.set('token', '', { expires: expireDuration });
  return response;
}