import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { LandingPageContext, NewBallotContext } from "./AdminCPContext";

const MobileAdminsCP = ({
  setShowNewBallot,
  setShowLandingPage,
}: {
  setShowNewBallot: (parm: boolean) => void;
  setShowLandingPage: (parm: boolean) => void;
}) => {
  const [toggle, setToggle] = useState(false);
  const showNewBallot = useContext(NewBallotContext);
  const showLandingPage = useContext(LandingPageContext);

  const switchNewBallotTab = () => {
    setShowNewBallot(true);
    setShowLandingPage(false);
  };
  return (
    <div className="">
      {!toggle ? (
        <Image
          src={"/images/system-management.png"}
          alt="Click to open management console"
          width={50}
          height={50}
          loading="lazy"
          className=" border-2 border-blue-900 rounded-lg bg-gray-400 hover:cursor-pointer"
          onClick={() => setToggle(true)}
        />
      ) : (
        <div>
          <div
            className="hover:cursor-pointer bg-gray-400 font-bold border-2 border-white flex justify-center items-center w-[45px] h-[40px] rounded-full text-[30px] text-black"
            onClick={() => setToggle(false)}
          >
            X
          </div>

          <div className="p-3 gap-3 bg-gray-400 absolute z-50 left-10 w-3/4 mobile:hidden flex flex-row justify-center items-center rounded-xl top-[65px]">
            <div className=" flex- flex-col ">
              <button
                onClick={switchNewBallotTab}
                className=" flex flex-col items-center justify-center w-[100px] h-[100px] bg-slate-900 rounded-lg hover:bg-blue-800 border-2 hover:border-slate-900 hover:shadow-2xl gap-2"
              >
                <Image
                  src={"/images/new-ballot.png"}
                  alt="Click to create a new ballot"
                  width={50}
                  height={50}
                  loading="lazy"
                  className=""
                />{" "}
                <span className=" text-white font-bold">New Ballot</span>
              </button>

              <Link
                href={""}
                className=" flex flex-col items-center justify-center w-[100px] h-[100px] bg-slate-900 rounded-lg hover:bg-blue-800 border-2 hover:border-slate-900 hover:shadow-2xl mt-5 gap-2"
              >
                <Image
                  src={"/images/rules-regulation.png"}
                  alt="Click to create a new ballot"
                  width={50}
                  height={50}
                  className=""
                />{" "}
                <span className=" text-white font-bold text-[12px]">
                  Adjust Rules
                </span>
              </Link>
            </div>

            <div className=" flex- flex-col ">
              <Link
                href={""}
                className=" flex flex-col items-center justify-center w-[100px] h-[100px] bg-slate-900 rounded-lg hover:bg-blue-800 border-2 hover:border-slate-900 hover:shadow-2xl gap-2"
              >
                <Image
                  src={"/images/user-guide.png"}
                  alt="Click to create a new ballot"
                  width={50}
                  height={50}
                  loading="lazy"
                  className=""
                />{" "}
                <span className=" text-white font-bold text-[12px]">
                  Adjust Guide
                </span>
              </Link>

              <Link
                href={""}
                className=" flex flex-col items-center justify-center w-[100px] h-[100px] bg-slate-900 rounded-lg hover:bg-blue-800 border-2 hover:border-slate-900 hover:shadow-2xl mt-5 gap-2"
              >
                <Image
                  src={"/images/manage-users.png"}
                  alt="Click to create a new ballot"
                  width={50}
                  height={50}
                  loading="lazy"
                  className=""
                />{" "}
                <span className=" text-white font-bold text-[12px]">
                  Manage users
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAdminsCP;
