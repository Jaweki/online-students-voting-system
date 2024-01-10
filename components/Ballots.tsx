"use client";
import { Ballot, UserToBallotRelationType } from "@/types/types";
import { useEffect, useState } from "react";
import BallotView from "./BallotView";
import { useSession } from "next-auth/react";
import { animateScroll as scroll } from "react-scroll";

const Ballots = () => {
  const { data: session }: any = useSession();
  const [ballots, setBallots] = useState<Ballot[] | null>(null);
  const [ground, setGround] = useState("main");
  const [ballotInView, setBallotInView] = useState<Ballot | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [userBallotRelation, setUserBallotRelation] =
    useState<UserToBallotRelationType | null>(null);

  useEffect(() => {
    const fetchUserToBallotRelation = async () => {
      try {
        const response = await fetch("/api/user-ballot-relation", {
          method: "POST",
          body: JSON.stringify({ userId: session?.user.userId }),
        });

        const data = await response.json();

        if (data.success) {
          setUserBallotRelation(data.success);
        }
      } catch (error) {
        alert("System Load fail. Check your internet connection!");
      }
    };
    fetchUserToBallotRelation();
  }, [session?.user.userId]);

  useEffect(() => {
    const fetchBallots = async () => {
      try {
        const response = await fetch("/api/fetch-ballots", {
          method: "GET",
          cache: "no-cache",
        });

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

  const handleScroll = () => {
    scroll.scrollTo(scrollIndex);
  };

  const handleViewBallot = (_id: any, scrollIndex_: number) => {
    if (ballots) {
      setGround(`${_id}`);
      const ballot: Ballot[] = ballots?.filter((ballot) => ballot._id === _id);
      setBallotInView(ballot[0]);

      const ballotScrollHeight = document.getElementById(_id)?.scrollHeight;

      if (ballotScrollHeight) {
        // 180 is the scroll offset from the top as the div holding
        // ballot lists is positioned 180 px from the top.
        setScrollIndex(ballotScrollHeight * scrollIndex_);
      }
    }
  };

  return (
    <div className=" w-full">
      {ground === "main" && (
        <div className=" w-full grid xl:grid-cols-3 md:grid-cols-2 max-md:flex max-md:flex-col gap-3 p-5 bg-slate-100 rounded-xl">
          {ballots?.map((ballot, index) => (
            <div
              key={ballot._id}
              id={ballot._id}
              className={`${
                ballot.type.binary
                  ? " bg-primary-alphaBurntOrange border border-primary-burntOrange hover:border-yellow-300 hover:shadow-yellow-300"
                  : " bg-primary-alphaTurquoise border border-primary-turquoise hover:border-slate-900"
              } hover:shadow-2xl  lg:w-[400px] md:w-[350px] max-md:w-full h-[300px] rounded-2xl p-3 flex flex-col gap-2 flex-nowrap overflow-hidden container relative`}
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
                  onClick={() => {
                    handleViewBallot(ballot._id, index + 1);
                  }}
                  className=" font-extrabold text-white bg-slate-950 rounded-lg w-[40px] h-[30px] hover:bg-blue-950 hover:shadow-slate-800 hover:shadow-2xl"
                >
                  {"_->"}
                </button>
              </div>
              <div className=" text-ellipsis font-extrabold md:text-[25px] max-md:text-[35px] max-mobile:text-[20px] basis-1/4 ">
                {ballot.title}
              </div>

              <div className="max-h-[85px] text-left font-andika overflow-hidden">
                <div
                  className="mobile:text-[25px] md:text-[18px] overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 3, // Adjust the number of lines to show before truncating
                  }}
                >
                  {ballot.desc}
                </div>
              </div>

              <div className="absolute bottom-3">
                <div
                  className={`${
                    ballot.type.binary ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  your vote status:{" "}
                  {userBallotRelation?.relation.filter(
                    (rel) => rel.ballot_id === ballot._id
                  )[0]?.ballot_id === ballot._id
                    ? "voted"
                    : "not voted"}
                </div>
                <div className=" flex flex-row gap-2 overflow-ellipsis">
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
      )}
      {ground !== "main" && (
        <BallotView
          userBallotRelation={userBallotRelation}
          setGround={setGround}
          ballot={ballotInView}
          setBallotInView={setBallotInView}
          handleScroll={handleScroll}
        />
      )}
    </div>
  );
};

export default Ballots;
