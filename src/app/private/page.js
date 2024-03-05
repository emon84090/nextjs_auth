import NormaLayout from "@/components/NormaLayout";
import { getUser } from "@/utils/JWThelper";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const data = await getUser(cookies().get("token")?.value);
  return (
    <>
      <NormaLayout>
        <p>
          this is private{" "}
          <span className="text-3xl font-semibold"> {data?.email}</span>
        </p>
      </NormaLayout>
    </>
  );
};

export default page;
