import NormaLayout from "@/components/NormaLayout";

import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  return (
    <>
      <NormaLayout>
        <p>page</p>
      </NormaLayout>
    </>
  );
};

export default page;
