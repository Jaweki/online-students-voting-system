"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [ismobile, setIsMobile] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);
  return (
    <div>
      {ismobile ? (
        <div className="flex flex-row px-5 py-2 justify-between relative">
          <Image
            src={"/images/zetech-logo.png"}
            alt="Zetech University logo"
            width={100}
            height={30}
          />

          {!menuToggle ? (
            <Image
              src={"/images/menu-icon.png"}
              alt="click on this menu icon on the top right of your screen to register, lgin or go to forum website"
              width={40}
              height={30}
              onClick={handleMenuToggle}
              className="absolute z-0 right-4"
            />
          ) : (
            <div className="w-1/2 flex flex-col absolute z-10 top-0 right-0  bg-slate-900">
              <Image
                src={"/images/close-menu-icon.png"}
                alt="click to close menu"
                width={100}
                height={50}
                className="absolute right-0 "
                onClick={handleMenuToggle}
              />
              <div className="mt-16 w-full text-white flex flex-col p-5 text-[20px] gap-3">
                <a className="underline  hover:text-gray-600 rounded-md  ">
                  Register
                </a>
                <a className="underline hover:text-gray-600 rounded-md ">
                  Login
                </a>
                <a
                  //   href=""
                  className=" font-extrabold font-andika text-[30px] underline hover:text-gray-800"
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
          />

          <div className=" flex flex-row justify-center items-center mr-10 gap-10">
            <button className="w-[100px] h-[40px] bg-slate-900 text-white hover:bg-blue-950 hover:text-gray-600 rounded-md flex justify-center items-center ">
              Register
            </button>
            <button className="w-[100px] h-[40px] bg-slate-900 text-white hover:bg-blue-950 hover:text-gray-600 rounded-md flex justify-center items-center ">
              Login
            </button>
            <a
              //   href=""
              className=" font-extrabold font-andika text-[30px] underline hover:text-gray-800"
            >
              Forum
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
