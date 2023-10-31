import Image from "next/image";
import { ChangeEvent } from "react";
import Ballots from "./Ballots";

interface LandingPageInputs {
  search: string;
}

interface AdminsLandingPageProps {
  input: LandingPageInputs;
  handleInputchange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  setGround: (param: string) => void;
}

const AdminsLandingPage = ({
  input,
  handleInputchange,
  handleSearch,
  setGround,
}: AdminsLandingPageProps) => {
  return (
    <div className=" w-full p-3 flex flex-col items-center relative">
      <div className=" w-[70%] md:w-[85%] max-mobile:w-[300px]  text-center flex flex-col items-center">
        <div className="w-full font-bold mobile:font-extrabold text-[50px] max-mobile:text-[30px] text-slate-800">
          Efficient Oversight for a Fair Election by Managing the Electoral
          Process with Precision.
        </div>
        <div className=" w-full">
          Get to administer Democracy behind the scence, ensuring{" "}
          <span className="font-bold">Fairness</span> and{" "}
          <span className="font-bold">Integrity</span> in every vote.
        </div>
      </div>

      <section className="my-10  w-[80%] h-[50px]">
        <div className="w-full flex flex-row text-gray-600 h-full rounded-full py-3 px-4 border-2  container hover:border-gray-700 focus:border-gray-700 hover:shadow-2xl">
          <input
            type="text"
            name="search"
            autoComplete="off"
            value={input.search}
            onChange={handleInputchange}
            placeholder="search a title, tag or a ballot description"
            className="grow h-full text-[20px] border-r-2 max-mobile:hidden outline-none border-none"
          />
          <input
            type="text"
            name="search"
            autoComplete="off"
            value={input.search}
            onChange={handleInputchange}
            placeholder="search"
            className="w-3/4 h-full border-r-2 mobile:hidden outline-none border-none"
          />
          <button type="button" onClick={handleSearch}>
            <Image
              src={"/images/search-icon.png"}
              alt="Click to search for a tag, title, or ballot description based on your input text"
              width={30}
              height={30}
              className=" mx-3 bg-gray-700 rounded-lg"
            />
          </button>
        </div>
      </section>

      {/* control panel */}
      <div className="  absolute w-full max-mobile:hidden">
        <div className="px-5 absolute left-0 flex- flex-col ">
          <button
            type="button"
            onClick={() => setGround("newBallot")}
            className=" flex flex-col items-center justify-center w-[100px] h-[100px] bg-slate-900 rounded-lg hover:bg-blue-800 border-2 hover:border-slate-900 hover:shadow-2xl gap-2"
          >
            <Image
              src={"/images/new-ballot.png"}
              alt="Click to create a new ballot"
              width={50}
              height={50}
              className=""
            />{" "}
            <span className=" text-white font-bold">New Ballot</span>
          </button>

          <button
            type="button"
            onClick={() => setGround("adjustRules")}
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
          </button>
        </div>

        <div className="px-5 absolute right-0 flex- flex-col ">
          <button
            type="button"
            onClick={() => setGround("adjustGuide")}
            className=" flex flex-col items-center justify-center w-[100px] h-[100px] bg-slate-900 rounded-lg hover:bg-blue-800 border-2 hover:border-slate-900 hover:shadow-2xl gap-2"
          >
            <Image
              src={"/images/user-guide.png"}
              alt="Click to create a new ballot"
              width={50}
              height={50}
              className=""
            />{" "}
            <span className=" text-white font-bold text-[12px]">
              Adjust Guide
            </span>
          </button>

          <button
            type="button"
            onClick={() => setGround("manageUsers")}
            className=" flex flex-col items-center justify-center w-[100px] h-[100px] bg-slate-900 rounded-lg hover:bg-blue-800 border-2 hover:border-slate-900 hover:shadow-2xl mt-5 gap-2"
          >
            <Image
              src={"/images/manage-users.png"}
              alt="Click to create a new ballot"
              width={50}
              height={50}
              className=""
            />{" "}
            <span className=" text-white font-bold text-[12px]">
              Manage users
            </span>
          </button>
        </div>
      </div>

      {/* Render the active ballots */}
      <Ballots />
    </div>
  );
};

export default AdminsLandingPage;
