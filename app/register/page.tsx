"use client";

import RegisterUser from "@/components/RegisterUser";
import RegistrationFailed from "@/components/RegistrationFailed";
import RegistrationSuccess from "@/components/RegistrationSuccess";
import { useState } from "react";
import { RegistrationStatusObject } from "@/types/types";

const Page = () => {
  const [status, setStatus] = useState<RegistrationStatusObject>({
    type: "pending",
    email: "",
    error: "",
  });
  return (
    <>
      {status.type === "pending" && <RegisterUser setStatus={setStatus} />}
      {status.type === "success" && (
        <RegistrationSuccess email={status.email} />
      )}
      {status.type === "failed" && <RegistrationFailed error={status.error} />}
    </>
  );
};

export default Page;
