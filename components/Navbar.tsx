"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/types/types";

export const Navbar = () => {
  const [ismobile, setIsMobile] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const router = useRouter();
  const { status, data } = useSession() as UserSessionType;

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  const handleLogin = () => {
    router.push("/users");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  if (status === "unauthenticated") {
    return (
      <div className="top-0 z-10 fixed bg-white w-full h-[100px]">
        {ismobile ? (
          <div className="flex flex-row px-5 py-2 justify-between relative">
            <Image
              src={"/images/zetech-logo.png"}
              alt="Zetech University logo"
              width={100}
              height={30}
              loading="lazy"
              onClick={() => router.push("/")}
              className=" hover:cursor-pointer"
            />

            {!menuToggle ? (
              <Image
                src={"/images/menu-icon.png"}
                alt="click on this menu icon on the top right of your screen to register, lgin or go to forum website"
                width={40}
                height={30}
                loading="lazy"
                onClick={handleMenuToggle}
                className="absolute z-0 right-4"
              />
            ) : (
              <div className="w-1/2 flex flex-col absolute z-10 top-3 right-3  bg-slate-900 rounded-lg">
                <Image
                  src={"/images/close-menu-icon.png"}
                  alt="click to close menu"
                  width={100}
                  height={100}
                  loading="lazy"
                  className="absolute -right-6 border rounded-full "
                  onClick={handleMenuToggle}
                />
                <div className="mt-16 w-full text-white flex flex-col p-5 text-[20px] gap-3">
                  <a
                    onClick={handleRegister}
                    className="underline  hover:text-gray-600 rounded-md hover:cursor-pointer "
                  >
                    Register
                  </a>
                  <a
                    onClick={handleLogin}
                    className="underline hover:text-gray-600 rounded-md hover:cursor-pointer"
                  >
                    Login
                  </a>
                  <a
                    //   href=""
                    className=" font-extrabold font-andika text-[30px] underline hover:text-gray-800 hover:cursor-pointer"
                  >
                    Forum
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className=" flex flex-row p-5 justify-between">
            <Image
              src={"/images/zetech-logo.png"}
              alt="Zetech University logo"
              width={200}
              height={40}
              loading="lazy"
              onClick={() => router.push("/")}
              className=" hover:cursor-pointer"
            />

            <div className=" flex flex-row justify-center items-center mr-10 gap-10">
              <button
                type="button"
                onClick={handleRegister}
                className="w-[100px] h-[40px] bg-slate-900 text-white hover:bg-blue-950 hover:text-gray-600 rounded-md flex justify-center items-center "
              >
                Register
              </button>
              <button
                type="button"
                onClick={handleLogin}
                className="w-[100px] h-[40px] bg-slate-900 text-white hover:bg-blue-950 hover:text-gray-600 rounded-md flex justify-center items-center "
              >
                Login
              </button>
              <a
                //   href=""
                className=" font-extrabold font-andika text-[30px] underline hover:text-gray-800 hover:cursor-pointer"
              >
                Forum
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
};
