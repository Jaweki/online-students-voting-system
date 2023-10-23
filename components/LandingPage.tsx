import Image from "next/image";
import { heroData } from "@/models/data";

const LandingPage = () => {
  return (
    <div className="w-full h-[400px] max-mobile:h-[200px] relative">
      <div className=" w-full h-full shadow-2xl rounded-xl">
        <Image
          src={"/images/people-aligning.png"}
          alt="..."
          fill
          className="rounded-xl "
        />
        <span className=" absolute font-playFair max-mobile:font-andika max-mobile:font-extrabold text-[50px] w-3/4 max-mobile:w-3/4 p-3 pt-1 pl-4 max-mobile:text-[20px] max-md:text-[30px] max-md:w-3/4">
          <span className="text-primary-zetecBlue ">Zetec University</span>{" "}
          Students Online Voting System
          <Image
            src={"/images/vote-checkmark.png"}
            alt="..."
            width={30}
            height={30}
            className="rounded-xl "
          />
        </span>
      </div>

      <div className="font-andika my-10 max-mobile:text-center">
        <h1 className=" font-bold text-[50px] text-center text-gray-700 max-mobile:text-[30px]">
          Welcome to Your Voice, Your Choice: Empower Change Today!
        </h1>
        <p>
          Are you ready to make your mark on the future? At Your Voice, Your
          Choice, we believe that your vote has the power to shape the world
          around you. Whether you&apos;re a future doctor, engineer, journalist,
          or pursuing any other path, your unique perspective and voice matter.
        </p>
        <p>Why should you be part of this movement?</p>
        <div className=" grid grid-cols-3 max-mobile:grid-cols-1 gap-2 p-10">
          {heroData.map((data) => (
            <div
              key={`${data}`}
              className=" border shadow-lg rounded-2xl w-[300px] p-2 border-primary-zetecBlue"
            >
              {data}
            </div>
          ))}
        </div>
        <p>
          Your voice matters, and Your Voice, Your Choice is the platform where
          your ideas meet action. Join us in the journey of making meaningful
          change, one vote at a time.
        </p>
        <p>
          <a href="#" className=" text-blue-800 underline">
            Register now
          </a>
          , and let&apos;s build a better future together!
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
