import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SendEmail } from "@/utils/Emailsend";
export async function POST(req, res) {
  const prismaclient = new PrismaClient();
  try {
    const data = await req.json();

    const findUnique = await prismaclient.user.findUnique({
      where: { email: data?.email },
    });

    if (findUnique) {
      return NextResponse.json(
        {
          status: false,
          message: "email already registared",
        },
        { status: 401 }
      );
    }

    const random = Math.ceil(Math.random() * 900000);

    var salt = bcrypt.genSaltSync(10);
    var hashpassword = bcrypt.hashSync(data["password"], salt);

    const create = prismaclient.user.create({
      data: {
        name: data["name"],
        email: data["email"],
        password: hashpassword,
      },
    });

    const update = prismaclient.user.update({
      data: {
        otp: random,
      },
      where: {
        email: data["email"],
      },
    });

    const finalresult = await prismaclient.$transaction([create, update]);

    const mailsend = await SendEmail(
      finalresult[0]["email"],
      `your acount verify code is ${random}`,
      "Acount Verify"
    );

    return NextResponse.json({
      status: true,

      message: "registration success",
    });
  } catch (err) {
    return NextResponse.json({
      status: false,
      message: err?.message || "something went wrong",
    });
  }
}
