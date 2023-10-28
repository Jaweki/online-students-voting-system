"use client";

import RegisterUser from "@/components/RegisterUser";
import RegistrationFailed from "@/components/RegistrationFailed";
import RegistrationSuccess from "@/components/RegistrationSuccess";
import { useState } from "react";
import { RegistrationStatusObject } from "@/types/types";
import styles from "@/styles/MainCard.module.css";
import Image from "next/image";

const MainCard = ({
  status,
  setStatus,
}: {
  status: RegistrationStatusObject;
  setStatus: (param: RegistrationStatusObject) => void;
}) => {
  const [userRole, setUserRole] = useState<string>("student");
  const [rotate, setRotate] = useState("");

  return (
    <div
      className={`${styles.card} ${rotate} flex flex-col justify-center items-center w-full`}
    >
      <div
        className={`${styles.frontCard} mt-10 bg-slate-900 w-[300px] h-[400px] flex flex-col  items-center gap-4 text-white rounded-xl relative pt-10`}
      >
        <button
          onClick={() => {
            setUserRole("admin");
          }}
          className={`w-1/2 p-5 border-2 flex flex-col items-center rounded-lg ${
            userRole === "admin"
              ? " border-blue-700 bg-gray-500 font-extrabold"
              : " border-gray-600 font-medium"
          }`}
        >
          <Image
            src={"/images/admin-icon.png"}
            alt="selected to login as an Admin"
            width={50}
            height={50}
          />
          Register as an Admin
        </button>
        <button
          onClick={() => {
            setUserRole("student");
          }}
          className={`w-1/2 p-5 border-2 flex flex-col items-center rounded-lg ${
            userRole === "student"
              ? " border-blue-700 bg-gray-500 font-extrabold"
              : " border-gray-600 font-medium"
          }`}
        >
          <Image
            src={"/images/student-icon.png"}
            alt="selected to login as a Student"
            width={50}
            height={50}
          />
          Register as a Student
        </button>

        <button
          onClick={() => {
            setRotate(`${styles.rotateFront}`);
          }}
          className={` bottom-2 right-5 text-white bg-slate-950 hover:bg-blue-700 w-[100px] h-[40px] rounded-lg absolute`}
        >
          NEXT
        </button>
      </div>

      <div
        className={`${styles.backCard} max-mobile:top-5 mobile:top-0 absolute`}
      >
        {status.type === "pending" && (
          <RegisterUser userRole={userRole} setStatus={setStatus} />
        )}
      </div>
    </div>
  );
};

const Page = () => {
  const [status, setStatus] = useState<RegistrationStatusObject>({
    type: "pending",
    email: "",
    error: "",
  });

  return (
    <>
      {status.type === "pending" && (
        <MainCard status={status} setStatus={setStatus} />
      )}
      {status.type === "success" && (
        <RegistrationSuccess email={status.email} />
      )}
      {status.type === "failed" && <RegistrationFailed error={status.error} />}
    </>
  );
};

export default Page;
