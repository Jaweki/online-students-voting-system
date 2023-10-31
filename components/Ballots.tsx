import { Ballot } from "@/types/types";
import { useEffect, useState } from "react";

const Ballots = () => {
  const [ballots, setBallots] = useState<Ballot[] | null>(null);

  useEffect(() => {
    const fetchBallots = async () => {
      try {
        const response = await fetch("/api/fetch-ballots");

        const data = await response.json();
        if (data.success && response.status === 200) {
          setBallots(data.success.reverse());
        } else if (data.fail_message || response.status === 500) {
          console.log(data.fail_message);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchBallots();
  }, []);

  return (
    <div className=" w-full md:grid md:grid-cols-3 max-md:flex max-md:flex-col gap-3 p-5 bg-slate-100 rounded-xl">
      {ballots?.map((ballot) => (
        <div
          key={ballot._id}
          className={`${
            ballot.type.binary
              ? " bg-primary-alphaBurntOrange border border-primary-burntOrange hover:border-yellow-300 hover:shadow-yellow-300"
              : " bg-primary-alphaTurquoise border border-primary-turquoise hover:border-slate-900"
          } hover:shadow-2xl  w-[400px] max-md:w-full h-[300px] rounded-2xl p-3 flex flex-col gap-2 flex-nowrap overflow-hidden container relative`}
        >
          <div
            className={`${
              ballot.type.binary ? "text-gray-600" : "text-gray-400"
            } font-semibold border-b border-b-gray-100 flex flex-row justify-between items-center pb-2`}
          >
            <span className="">
              {`${
                ballot.type.binary ? "Binary Choice" : "Candidate Vote"
              } Ballot`}
            </span>
            <button
              type="button"
              className=" font-extrabold text-white bg-slate-950 rounded-lg w-[40px] h-[30px] hover:bg-blue-950 hover:shadow-slate-800 hover:shadow-2xl"
            >
              {"_->"}
            </button>
          </div>
          <div className=" text-ellipsis font-extrabold md:text-[25px] max-md:text-[35px] max-mobile:text-[20px] basis-1/4 ">
            {ballot.title}
          </div>

          <div className=" text-left font-andika  mobile:text-[25px] md:text-[18px] text-ellipsis absolute z-0 bottom-14 mb-10 ">
            {ballot.desc}
          </div>

          <div className="absolute z-0 bottom-3">
            <div
              className={`${
                ballot.type.binary ? "text-gray-600" : "text-gray-400"
              }`}
            >
              your vote status: <span className="">vote not cast</span>
            </div>
            <div className=" flex flex-row gap-2 ">
              {ballot.tags.map((tag) => (
                <span key={tag} className=" font-bold">
                  #
                  <span className=" text-blue-950">
                    {tag.trim().split(" ").join("")}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ballots;
