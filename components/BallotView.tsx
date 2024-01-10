import { Ballot, UserToBallotRelationType } from "@/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Nominiees = {
  userId: "";
  name: "";
  avatar: "";
  email: "";
};

const BallotView = ({
  setGround,
  ballot,
  setBallotInView,
  handleScroll,
  userBallotRelation,
}: {
  setGround: (param: string) => void;
  ballot: Ballot | null;
  setBallotInView: (param: null | Ballot) => void;
  handleScroll: () => void;
  userBallotRelation: UserToBallotRelationType | null;
}) => {
  const { data: session }: any = useSession();
  const [userIds, setUserIds] = useState<string[] | null>(null);
  const [nominees, setNominees] = useState<Nominiees[] | null>(null);
  const [validityObj, setValidityObj] = useState({
    valid: true,
    message: "",
  });
  const [votedCandidate, setVotedCandidate] = useState<string | null>(null);
  const [binaryVote, setBinaryVote] = useState<string | null>(null);

  const handleErrorsGracefully = (message: string) => {
    setValidityObj({
      valid: false,
      message: message,
    });
    setTimeout(() => {
      setValidityObj({
        valid: true,
        message: "",
      });
    }, 7000);
  };

  useEffect(() => {
    const fetchNomineesData = async () => {
      try {
        const response = await fetch("/api/get-candidates", {
          method: "POST",
          body: JSON.stringify({ userIds: userIds }),
          cache: "no-cache",
        });

        const data = await response.json();

        if (response.status === 201 && data.success) {
          const fetchResult = data.success;
          setNominees(fetchResult);
        }
      } catch (error) {
        handleErrorsGracefully("Connect to the internet to continue.");
      }
    };
    fetchNomineesData();
  }, [userIds]);

  useEffect(() => {
    if (ballot?.type.binary) {
      const userBallotRel =
        userBallotRelation?.relation.filter(
          (rel) => rel.ballot_id === ballot._id
        ) ?? null;

      if (userBallotRel !== null) {
        setBinaryVote(userBallotRel[0]?.type.vote || null);
      }
    } else if (!ballot?.type.binary) {
      const userBallotRel =
        userBallotRelation?.relation.filter(
          (rel) => rel.ballot_id === ballot?._id
        ) ?? null;

      if (userBallotRel !== null) {
        setVotedCandidate(userBallotRel[0]?.type.candidate || null);
      }
    }
  }, [ballot, userBallotRelation?.relation]);

  useEffect(() => {
    if (ballot?.type.candidate) {
      const userIds_: string[] = ballot?.type.candidate.map(
        (obj) => obj.userId
      );
      setUserIds(userIds_);
    }

    window.scroll({
      top: 400,
      behavior: "smooth",
    });
  }, [ballot?.type.candidate]);

  const handleBinaryVote = async (vote: string) => {
    setBinaryVote(vote);
    try {
      const response = await fetch("/api/place-binary-vote", {
        method: "POST",
        body: JSON.stringify({
          userId: session.user.userId,
          ballot_id: ballot?._id,
          vote: vote,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        handleErrorsGracefully("Thank you for your VOTE.");
        return;
      } else if (data.fail_message || response.status === 500) {
        setBinaryVote(null);
        handleErrorsGracefully(
          "Vote placement failed due to Internal server Error. Try again Later"
        );
      }
    } catch (error) {
      setBinaryVote(null);
      handleErrorsGracefully(
        " Vote Placement Failed. Check your internet connection!"
      );
    }
  };

  const handleVoteCandidate = async (candidateId: string) => {
    setVotedCandidate(candidateId);
    try {
      if (session?.user) {
        const response = await fetch("/api/vote-candidate", {
          method: "POST",
          body: JSON.stringify({
            ballot_id: ballot?._id,
            userId: session?.user.userId,
            candidateId,
          }),
        });

        if (response.status === 201) {
          handleErrorsGracefully("Thank you for your VOTE.");
          return;
        } else {
          setVotedCandidate(null);
          handleErrorsGracefully(
            "Internal system Error! contact site developer."
          );
        }
      }
    } catch (error) {
      handleErrorsGracefully("Connect to the internet to continue.");
      setVotedCandidate(null);
    }
  };

  const handleBackButton = () => {
    setGround("main");
    setBallotInView(null);
    handleScroll();
  };
  return (
    <div className=" bg-slate-100 w-full p-4 grid grid-cols-2 gap-3 rounded-lg relative max-md:flex max-md:flex-col max-md:gap-4">
      <span
        className={`${
          !validityObj.valid
            ? " text-center absolute top-10 bg-red-500 text-white rounded-lg font-bold"
            : "hidden"
        }`}
      >
        {validityObj.message}
      </span>
      <div className="w-full col-span-2 flex flex-row justify-between items-center max-mobile:flex-col max-mobile:items-end">
        <button
          type="button"
          onClick={handleBackButton}
          className="text-[20px] mobile:hidden text-white h-3/4 bg-slate-950 p-2 rounded-lg hover:bg-blue-950"
        >
          Back {"->"}
        </button>
        <span className="underline text-[40px] max-mobile:text-[30px]  text-gray-700 font-extrabold">
          {ballot?.title}
        </span>
        <button
          type="button"
          onClick={handleBackButton}
          className="text-[20px] max-mobile:hidden text-white h-3/4 bg-slate-950 p-2 rounded-lg hover:bg-blue-950"
        >
          Back {"->"}
        </button>
      </div>

      <div className="flex flex-col gap-4 max-md:col-span-2">
        <span className=" w-1/2 max-mobile:w-full text-[25px] font-andika">
          {ballot?.desc}
        </span>
        <span className="flex flex-row gap-3 font-semibold text-slate-900">
          {ballot?.tags.map((tag) => `#${tag} `)}
        </span>
      </div>

      <div
        className={` ${
          ballot?.type.binary
            ? "w-full flex flex-col md:border-l md:pl-3 max-md:border-t max-md:pt-3"
            : "hidden"
        } `}
      >
        <span className="font-bold text-[25px] mobile:text-[35px] max-md:text-center">
          Choose your vote
        </span>
        <div
          className={`${
            binaryVote !== null ? " opacity-75 cursor-not-allowed" : ""
          } flex flex-row justify-around items-center`}
        >
          <div
            className={`${binaryVote !== null ? " font-semibold" : "hidden"}`}
          >
            You voted:{" "}
          </div>
          <button
            type="button"
            disabled={binaryVote !== null}
            onClick={() => handleBinaryVote("up")}
            className={`${
              binaryVote === "up" || binaryVote === null
                ? "flex flex-row bg-slate-950 hover:bg-blue-950 p-2 rounded-lg text-white font-bold items-center gap-3"
                : "hidden"
            } ${binaryVote !== null ? " cursor-not-allowed" : ""}`}
          >
            Support
            <Image
              src={"/images/vote-support.png"}
              alt="Vote support"
              width={35}
              height={35}
            />
          </button>
          <button
            type="button"
            disabled={binaryVote !== null}
            onClick={() => handleBinaryVote("down")}
            className={`${
              binaryVote === "down" || binaryVote === null
                ? "flex flex-row bg-slate-950 hover:bg-blue-950 p-2 rounded-lg text-white font-bold items-center gap-3"
                : "hidden"
            } ${binaryVote !== null ? " cursor-not-allowed" : ""}`}
          >
            Decline
            <Image
              src={"/images/vote-decline.png"}
              alt="Vote Decline"
              width={35}
              height={35}
            />
          </button>
        </div>
      </div>

      <div
        className={`${
          ballot?.type.binary ? "hidden" : "flex flex-col gap-6 max-mobile:mt-3"
        } `}
      >
        <span className="font-bold text-[25px] mobile:text-[35px] max-md:text-center">
          Vote one nominated candidate
        </span>
        {ballot?.type.candidate.map((candidate, index) => (
          <div
            key={candidate.userId}
            className={`flex flex-col border-b-2 border-b-slate-700 gap-2 ${
              votedCandidate !== null && votedCandidate !== candidate.userId
                ? " opacity-25 cursor-not-allowed"
                : ""
            }`}
          >
            <div className=" flex flex-row gap-2 container max-mobile:flex-col">
              <Image
                src={nominees ? nominees[index].avatar : ""}
                alt={`${nominees ? nominees[index].name : ""}`}
                width={40}
                height={40}
                className=" rounded-full "
              />

              <div className="flex flex-col grow">
                <span className="">
                  {nominees ? nominees[index].name.toLocaleUpperCase() : ""}
                </span>
                <span className=" font-semibold">
                  {nominees ? nominees[index].userId : ""}
                </span>
              </div>
              <button
                type="button"
                disabled={votedCandidate !== null}
                onClick={() => handleVoteCandidate(candidate.userId)}
                className={`  ${
                  votedCandidate !== null && votedCandidate !== candidate.userId
                    ? " hidden"
                    : ""
                } ${
                  votedCandidate === candidate.userId
                    ? " bg-gray-500 hover:bg-gray-500 hover:cursor-not-allowed text-white p-2 rounded-lg font-bold"
                    : "bg-slate-950 text-white p-2 rounded-lg font-bold hover:bg-blue-950"
                }`}
              >
                {`${votedCandidate === candidate.userId ? "Voted" : "Vote"}`}
              </button>
            </div>
            <div className="border rounded-lg w-3/4 flex flex-col">
              <span className="w-full font-andika">{candidate.desc}</span>
              <span className="w-full font-playFair">{candidate.slogan}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BallotView;
