import { ChangeEvent, FormEvent, useState } from "react";
import _ from "lodash";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/types/types";

type InputState = {
  title: string;
  desc: string;
  tags: string;
  time_span: {
    from: string;
    to: string;
  };
  type: {
    binary: boolean;
    candidate: Array<{ userId: string; slogan: string; desc: string }>;
  };
};

const CreateBallot = ({
  setGround,
}: {
  setGround: (param: string) => void;
}) => {
  const { data: session } = useSession() as UserSessionType;
  const [input, setInput] = useState<InputState>({
    title: "",
    desc: "",
    tags: "",
    time_span: {
      from: "",
      to: "",
    },
    type: {
      binary: true,
      candidate: [{ userId: "", slogan: "", desc: "" }],
    },
  });

  const [searchUserId, setSearchUserId] = useState("");

  const [candidates, setCandidates] = useState([
    {
      userId: "",
      name: "",
      avatar: "",
    },
  ]);

  const [invalidObj, setInvalidObj] = useState({
    case: false,
    text: "Invalid Test_normaly ignore this!",
  });

  const handleSetGround = () => {
    setGround("landingPage");
  };

  const handleMoveToParentComponent = () => {
    window.location.assign("/users");
  };

  const handleInvalidCases = (message: string) => {
    setInvalidObj({
      case: true,
      text: message,
    });
    setTimeout(() => {
      setInvalidObj({ case: false, text: "" });
    }, 7000);
  };

  const handleBallotType = () => {
    const inputDeepCopy = _.cloneDeep(input);
    inputDeepCopy.type.binary = !inputDeepCopy.type.binary;
    setInput(inputDeepCopy);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "candidateAdd") {
      setSearchUserId(value);
      return;
    }
    let index_;
    index_ = parseInt(name.split("-")[1]);

    const inputDeepCopy = _.cloneDeep(input);
    if (name === "from" || name === "to") {
      if (!isNaN(+value.charAt(value.length - 1)) && value.length <= 10) {
        inputDeepCopy.time_span[name] = value;
        setInput(inputDeepCopy);
      }
    } else if (
      name.includes("candidate_desc-") &&
      inputDeepCopy.type.candidate[index_]
    ) {
      // const index_ = parseInt(name.split("-")[1]);
      inputDeepCopy.type.candidate[index_].desc = value;
      setInput(inputDeepCopy);
      return;
    } else if (
      name.includes("candidate_slogan-") &&
      inputDeepCopy.type.candidate[index_]
    ) {
      // const index_ = parseInt(name.split("-")[1]);
      inputDeepCopy.type.candidate[index_].slogan = value;
      setInput(inputDeepCopy);
      return;
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleAddCandidate = async () => {
    if (!searchUserId) {
      handleInvalidCases(
        "Please provide a students number (regNo) for search and add!"
      );
      return;
    }
    const payload = new FormData();
    payload.append("userId", searchUserId);

    try {
      const response = await fetch("/api/search-candidate", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (data.success) {
        const user = data.success;
        if (user.role === "student") {
          for (let i = 0; i < candidates.length; i++) {
            if (candidates[i].userId === user.userId) {
              return;
            }
          }

          const inputDeepCopy = _.cloneDeep(input);
          // if (!inputDeepCopy.type.candidate[0].userId) {
          //   inputDeepCopy.type.candidate.pop();
          // }
          inputDeepCopy.type.candidate.push({
            userId: user.userId,
            slogan: "",
            desc: "",
          });
          setInput(inputDeepCopy);

          setCandidates([
            ...candidates,
            {
              userId: user.userId,
              name: user.name,
              avatar: user.avatar,
            },
          ]);
        } else if (user.role === "admin") {
          // reject admins
          handleInvalidCases("Invalid! Admins, cannot be nominated");
        }
      } else if (data.fail_message) {
        // send error to the ui...
        handleInvalidCases(data.fail_message);
      }
    } catch (error) {
      // console.log(error);
      handleInvalidCases(`${error}`);
    }
  };

  const handleDeleteCandidate = (user_id: string) => {
    const remainingCandidates = candidates.filter(
      (candidate) => candidate.userId !== user_id
    );

    setCandidates(remainingCandidates);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputDeepCopy = _.cloneDeep(input);
    const deletedObjs: {}[] | null = [];
    inputDeepCopy.type.candidate.forEach((candidate) => {
      if (!candidate.userId || !candidate.desc || !candidate.slogan) {
        deletedObjs?.push(
          inputDeepCopy.type.candidate.splice(
            inputDeepCopy.type.candidate.indexOf(candidate),
            1
          )
        );
      }
    });
    setInput(inputDeepCopy);

    const payload = { ...inputDeepCopy, admin: session?.user.userId };
  };

  return (
    <div className=" bg-neutral-magnolia w-[100vw] md:h-[80vh] px-4 pt-2 font-jakarta overflow-x-hidden flex flex-col items-center relative max-md:mt-3">
      <span
        className={` absolute top-10 min-w-[20%] min-h-[50px] text-center bg-red-500 text-white flex flex-col items-center justify-center rounded-lg text-[17px] font-thin p-2 ${
          invalidObj.case ? "" : "hidden"
        }`}
      >
        {invalidObj.text}
      </span>
      <span className="w-full font-extrabold font-playFair text-[50px] text-blue-950 max-mobile:hidden max-md:mt-2">
        Customize and Create a Ballot to Your Preference
      </span>
      <span className="font-extrabold font-playFair text-[40px] mobile:hidden md:hidden text-blue-950 mb-4">
        Create a Ballot
      </span>
      <form
        onSubmit={handleSubmit}
        className="w-full md:grid md:grid-cols-2 md:grid-rows-2 max-md:flex max-md:flex-col max-md:gap-0 max-md:mb-20 "
      >
        <div className="px-4 ">
          <label className="">
            <span className="text-[25px] font-bold">Title</span>
            <input
              type="text"
              name="title"
              required
              value={input.title}
              onChange={handleInputChange}
              placeholder="e.g. Student Council elections"
              className="w-full h-[50px] p-3 border focus:border-2 focus:outline-blue-900 rounded-2xl text-[19px] font-semibold max-mobile:text-[15px]"
            />
          </label>
          <label className="">
            <span className=" text-[25px] font-bold">Description</span>
            <textarea
              name="desc"
              required
              value={input.desc}
              onChange={handleInputChange}
              placeholder=" Give a description of this ballot to guide the voters..."
              className="w-full md:h-[200px] p-3 border focus:border-2 focus:outline-blue-900 rounded-2xl text-[19px] max-mobile:text-[15px] max-md:h-[200px]"
            />
          </label>
          <label className=" mt-6">
            <span className="text-[25px] font-bold">Tags</span>
            <input
              type="text"
              name="tags"
              required
              value={input.tags}
              onChange={handleInputChange}
              placeholder="e.g. empowerchange, newcouncil, studentengagement"
              className="w-full h-[50px] p-3 border focus:border-2 focus:outline-blue-900 rounded-2xl text-[19px] max-mobile:text-[13px]"
            />
          </label>
        </div>

        <div className="flex flex-col w-full md:col-span-1 px-2 overflow-x-hidden ">
          <div className=" flex flex-col gap-3">
            <span className=" text-[20px] font-bold pl-2">
              Ballot Time-span
            </span>
            <div className="flex flex-row w-full mobile:justify-between max-mobile:flex-col max-mobile:gap-3">
              <label className=" flex flex-row w-1/2 px-5 gap-2 max-mobile:justify-between max-mobile:w-full">
                <span className=" font-bold">From:</span>
                <input
                  type="text"
                  name="from"
                  required
                  placeholder="e.g. DD-MM-YYYY"
                  value={input.time_span.from}
                  onChange={handleInputChange}
                  className=" w-full h-[20px] p-3 border focus:border-2 focus:outline-blue-900 rounded-lg text-[15px] max-mobile:h-[40px]"
                />
              </label>
              <label className=" flex flex-row w-1/2 px-5 gap-2 max-mobile:justify-between max-mobile:w-full">
                <span className=" font-bold">To: </span>
                <input
                  type="text"
                  name="to"
                  required
                  placeholder="e.g. DD-MM-YYYY"
                  value={input.time_span.to}
                  onChange={handleInputChange}
                  className=" w-full h-[20px] p-3 border focus:border-2 focus:outline-blue-900 rounded-lg text-[15px] max-mobile:h-[40px]"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col mt-5 gap-3 ">
            <span className="text-[19px] font-bold">Ballot Vote Type</span>
            <div className="flex flex-row bg-gray-200 w-full h-[40px] rounded-lg hover:shadow-2xl justify-center items-center gap-4">
              <span
                className={`font-bold text-[18px] ${
                  input.type.binary ? " text-blue-950" : " text-gray-500"
                }`}
              >
                Binary
              </span>
              <div
                onClick={handleBallotType}
                className=" bg-blue-950 w-[45px] h-[25px] flex justify-center items-center rounded-full relative"
              >
                <div
                  className={` h-[20px] w-[20px] bg-white rounded-full absolute ${
                    input.type.binary ? "left-1" : "right-1"
                  }`}
                />
              </div>
              <span
                className={`font-bold text-[18px] ${
                  !input.type.binary ? " text-blue-950" : " text-gray-500"
                }`}
              >
                Candidate
              </span>
            </div>
          </div>

          <div
            className={`${
              !input.type.binary ? "" : "hidden"
            } mt-3 w-full mobile:px-3`}
          >
            <div className=" w-full mobile:px-3 max-mobile:pr-2 h-[40px] border-2 rounded-full border-gray-500 mobile:container flex flex-row mobile:justify-center items-center hover:border-slate-900 max-mobile:justify-between">
              <input
                type="text"
                name="candidateAdd"
                placeholder="Add a users by their Id..."
                value={searchUserId}
                onChange={handleInputChange}
                className="h-[35px] mobile:grow rounded-full border outline-none p-2 focus:border-b-slate-900 font-semibold leading-loose "
              />
              <button
                type="button"
                onClick={handleAddCandidate}
                className=" bg-slate-900 w-[30px] h-[30px] rounded-lg text-white ml-2 hover:shadow-md hover:bg-blue-950 font-bold text-[20px] flex justify-center items-center "
              >
                +
              </button>
            </div>
          </div>

          <div
            className={`${
              !input.type.binary ? "" : "hidden"
            } w-full md:h-full max-mobile:h-[35vh] max-md:grid max-md:grid-col-1 overflow-x-hidden overflow-y-scroll gap-12 max-md:min-h-[200px] max-mobile:min-h-[200px] max-md:max-h-[700px] max-mobile:max-h-[500px] `}
          >
            {candidates &&
              candidates.map((candidate, index) => {
                if (candidate.userId == "" || candidate.userId == null) {
                  return;
                } else {
                  return (
                    <div
                      key={candidate.userId}
                      className={`w-[95%] p-2 flex flex-col mobile:gap-2 relative ${
                        !input.type.binary ? "" : "hidden"
                      }`}
                    >
                      <div className="flex flex-row p-3 gap-4">
                        <Image
                          src={candidate.avatar}
                          alt={`${candidate.name}'s profile avatar`}
                          width={50}
                          height={50}
                          loading="lazy"
                          className="rounded-full max-mobile:hidden"
                        />
                        <Image
                          src={candidate.avatar}
                          alt={`${candidate.name}'s profile avatar`}
                          width={44}
                          height={30}
                          loading="lazy"
                          className="rounded-full mobile:hidden"
                        />
                        <div className="w-full flex flex-row justify-between items-center">
                          <div className="flex flex-col font-andika">
                            <span className=" font-bold">
                              {candidate.userId}
                            </span>
                            <span className="">
                              {candidate.name.toLocaleUpperCase()}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteCandidate(candidate.userId)
                            }
                            className="text-[20px] text-black font-extrabold w-[75px] h-[30px] border-2 border-gray-800 rounded-full flex justify-center items-center hover:bg-slate-600 mr-5 max-mobile:hidden"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteCandidate(candidate.userId)
                            }
                            className="text-[20px] text-black font-extrabold w-[20px] h-[20px] border-2 border-gray-800 rounded-full flex justify-center items-center hover:bg-slate-600 mr-5 mobile:hidden absolute right-0 top-11"
                          >
                            -
                          </button>
                        </div>
                      </div>

                      <div className="w-[80%] max-mobile:w-full mobile:ml-30 border border-gray-400 rounded-md mobile:absolute mobile:top-[75px] mobile:left-[85px] max-mobile:text-[15px]">
                        <textarea
                          name={`candidate_desc-${index}`}
                          required
                          value={input.type.candidate[index]?.desc}
                          onChange={handleInputChange}
                          placeholder="Add a short description..."
                          className="w-full h-[70px] border border-b rounded-lg p-2"
                        />
                        <input
                          type="text"
                          name={`candidate_slogan-${index}`}
                          required
                          value={input.type.candidate[index]?.slogan}
                          onChange={handleInputChange}
                          placeholder="Add a slogan"
                          className="w-full rounded-lg p-1 px-2"
                        />
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>

        <section className=" w-full mt-3 flex flex-row justify-between font-bold font-andika px-5 max-md:absolute max-mobile:bottom-5 max-md:bottom-5 max-md:right-2 max-md:px-7 max-mobile:px-6 max-mobile:pr-2">
          <button
            type="button"
            onClick={handleSetGround}
            className="max-mobile:hidden bg-gray-300 rounded-lg w-[90px] h-[40px] text-slate-900 hover:bg-gray-700 hover:text-white hover:shadow-2xl"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={handleMoveToParentComponent}
            className="mobile:hidden bg-gray-300 rounded-lg w-[90px] h-[40px] text-slate-900 hover:bg-gray-700 hover:text-white hover:shadow-2xl"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className=" bg-slate-950 rounded-lg w-[90px] h-[40px] text-white hover:bg-blue-900 hover:shadow-2xl "
          >
            CREATE
          </button>
        </section>
      </form>
    </div>
  );
};

export default CreateBallot;
