"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { UserSessionType } from "@/types/types";
import MobileAdminsCP from "./MobileAdminsCP";
import { useRouter } from "next/navigation";

const UserNavBar = () => {
  const [ismobile, setIsMobile] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const { data: session, status } = useSession() as UserSessionType;
  const router = useRouter();

  const [user, setUser] = useState<{
    name: string | undefined;
    avatar: string | undefined;
  }>({
    name: "",
    avatar: "",
  });

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    setUser({
      name: session?.user.name,
      avatar: session?.user.avatar,
    });
  }, [session]);

  return (
    <div className={`${status === "authenticated" ? "" : "hidden"}`}>
      {ismobile ? (
        <div className="w-[100vw] h-[60px] flex flex-row px-5 py-2 justify-between relative bg-slate-900">
          <Image
            src={"/images/zetech-logo.png"}
            alt="Zetech University logo"
            width={100}
            height={30}
            onClick={handleLogout}
            className=" hover:cursor-pointer"
          />

          <div className=" flex flex-row w-1/2 justify-between items-center">
            {session?.user.role === "admin" && <MobileAdminsCP />}
            {!menuToggle ? (
              <Image
                src={user.avatar as string}
                alt="click on this menu icon on the top right of your screen to register, lgin or go to forum website"
                width={55}
                height={55}
                onClick={handleMenuToggle}
                className="absolute z-0 right-4 rounded-full"
              />
            ) : (
              <div className="w-[200px] flex flex-col absolute z-10 top-3 border-2 border-blue-900 right-3 bg-slate-900 rounded-lg">
                <Image
                  src={"/images/close-menu-icon.png"}
                  alt="click to close menu"
                  width={100}
                  height={100}
                  className="absolute -right-6 rounded-full "
                  onClick={handleMenuToggle}
                />
                <div className="mt-16 w-full text-white flex flex-col p-5 text-[16px] gap-3">
                  <p className=" flex flex-col border border-white rounded-xl p-3">
                    <span className="">Welcome: </span>
                    <span className=" text-gray-600 font-extrabold">
                      {user.name?.toLocaleUpperCase()}
                    </span>
                  </p>
                  <button className=" border-b-2 border-b-teal-700 hover:bg-gray-600 rounded-lg h-[30px] text-gray-500 hover:text-white">
                    Notifications
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className=" border-b-2 border-b-teal-700 hover:bg-gray-600 rounded-lg h-[30px] text-gray-500 hover:text-white"
                  >
                    LOGOUT
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
        </div>
      ) : (
        <div className=" flex flex-row p-5 justify-between bg-slate-900 text-white gap-3">
          <Image
            src={"/images/zetech-logo.png"}
            alt="Zetech University logo"
            width={200}
            height={40}
            onClick={handleLogout}
            className=" hover:cursor-pointer"
          />

          <div className=" flex flex-row justify-center items-center mr-10 gap-10">
            <div className="flex flex-row gap-4 h-50px justify-between items-center">
              <span className="">
                Welcome. {"  "}
                <span className="text-gray-600 font-extrabold">
                  {session?.user.name.toLocaleUpperCase()}
                </span>
              </span>
              <Image
                src={user.avatar as string}
                alt="Your Profile photo"
                width={70}
                height={70}
                className="rounded-full mr-10"
              />
            </div>
            <button className=" border-b-2 border-b-teal-700 hover:bg-gray-600 p-2 h-[35px] rounded-lg hover:cursor-pointer">
              Notifications
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className=" border-b-2 border-b-teal-700 hover:bg-gray-600 p-2 h-[35px] rounded-lg hover:cursor-pointer"
            >
              LOGOUT
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
};

export default UserNavBar;
