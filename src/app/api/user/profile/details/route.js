import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const prismaclient = new PrismaClient();
  try {
    const headerlist = headers();
    const id = headerlist.get("id");
    const res = await prismaclient.user.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return NextResponse.json({ status: true, data: res });
  } catch (err) {
    return NextResponse.json({
      status: false,
      message: err?.message || "something went wrong",
    });
  }
}
