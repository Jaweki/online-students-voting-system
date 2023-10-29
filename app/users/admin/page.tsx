"use client";

import { UserSessionType } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useContext, useState } from "react";
import AdminsLandingPage from "@/components/AdminsLandingPage";
import CreateBallot from "@/components/CreateBallot";
import UserRules from "@/components/UserRules";
import UserGuide from "@/components/UserGuide";
import ManageUsers from "@/components/ManageUsers";
import {
  AdjustGuideContext,
  AdjustRulesContext,
  LandingPageContext,
  ManageUsersContext,
  NewBallotContext,
} from "@/components/AdminCPContext";

const Page = () => {
  const showLandingPage = useContext(LandingPageContext);
  const showNewBallot = useContext(NewBallotContext);
  const showAdjustGuide = useContext(AdjustGuideContext);
  const showAdjustRules = useContext(AdjustRulesContext);
  const showManageUsers = useContext(ManageUsersContext);

  const [ground, setGround] = useState("landingPage");

  const { data: session, status } = useSession() as UserSessionType;
  const router = useRouter();
  const [input, setInput] = useState({
    search: "",
  });

  const handleInputchange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSearch = () => {
    // to do:
  };

  if (status === "unauthenticated") {
    return (
      <div className="w-[100vw] flex flex-col justify-center items-center">
        <div className=" mt-5 w-[300px] bg-slate-900 h-[400px] flex flex-col p-3 items-center justify-center relative rounded-lg">
          <div className="w-full flex flex-col justify-center items-center gap-10">
            <span className="w-full font-bold text-[25px] text-gray-600 text-center">
              Session Expired!
            </span>
            <p className=" text-center text-white">
              Click dismiss to move to home page. To continue with your session,
              You can login to authenticate.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/")}
            className=" bg-slate-950 hover:bg-blue-700 w-[100px] h-[40px] text-white font-extrabold rounded-lg absolute bottom-10"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  } else if (status === "authenticated") {
    return (
      <>
        <div className=" max-mobile:hidden ">
          {ground === "landingPage" && (
            <AdminsLandingPage
              input={input}
              handleInputchange={handleInputchange}
              handleSearch={handleSearch}
              setGround={setGround}
            />
          )}
          {ground === "newBallot" && <CreateBallot setGround={setGround} />}
          {ground === "adjustRules" && <UserRules />}
          {ground === "adjustGuide" && <UserGuide />}
          {ground === "manageUsers" && <ManageUsers />}
        </div>
        <div className=" mobile:hidden ">
          {showLandingPage && (
            <AdminsLandingPage
              input={input}
              handleInputchange={handleInputchange}
              handleSearch={handleSearch}
              setGround={setGround}
            />
          )}

          {showNewBallot && <CreateBallot setGround={setGround} />}

          {showAdjustRules && <UserRules />}
          {showAdjustGuide && <UserGuide />}
          {showManageUsers && <ManageUsers />}
        </div>
      </>
    );
  }
};

export default Page;
