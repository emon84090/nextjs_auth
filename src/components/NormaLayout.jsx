import React from "react";
import Header from "./Header";
import { cookies } from "next/headers";
import { getUser } from "@/utils/JWThelper";

const NormaLayout = async ({ children }) => {
  const data = await getUser(cookies().get("token")?.value);

  return (
    <>
      <Header data={data}></Header>
      {children}
    </>
  );
};

export default NormaLayout;
