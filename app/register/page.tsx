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
  const [userRole, setUserRole] = useState<string>("");
  const [rotate, setRotate] = useState("");

  return (
    <div
      className={`${styles.card} ${rotate} flex flex-col justify-center items-center w-full mt-28`}
    >
      <div
        className={`${styles.frontCard} max-mobile:mt-10 bg-slate-900 w-[350px] max-mobile:w-[290px] h-[450px] max-mobile:h-[100vh] flex flex-col  items-center text-white rounded-xl relative pt-10 mt-3`}
      >
        <button
          onClick={() => {
            setUserRole("admin");
          }}
          className={`w-1/2 p-5 h-[140px] border-2 flex flex-col items-center rounded-lg ${
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
          An Admin
        </button>
        <div className="flex flex-row gap-2 max-mobile:flex-col w-full p-3 justify-center items-center">
          <button
            onClick={() => {
              setUserRole("student");
            }}
            className={`w-1/2 h-[140px] p-5 border-2 flex flex-col items-center rounded-lg  ${
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
            A Student
          </button>
          <button
            onClick={() => {
              setUserRole("staff");
            }}
            className={`w-1/2 p-5 h-[140px] border-2 flex flex-col items-center rounded-lg ${
              userRole === "staff"
                ? " border-blue-700 bg-gray-500 "
                : " border-gray-600 font-medium"
            }`}
          >
            <Image
              src={"/images/institutions-staff.png"}
              alt="selected to login as an institutions staff"
              width={50}
              height={50}
            />
            An Institutions Staff
          </button>
        </div>

        <button
          onClick={() => {
            setRotate(`${styles.rotateFront}`);
          }}
          disabled={userRole == ""}
          className={` ${
            userRole == ""
              ? "opacity-0"
              : " bottom-2 right-5 text-white bg-slate-950 hover:bg-blue-700 w-[100px] h-[40px] rounded-lg absolute"
          }`}
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
