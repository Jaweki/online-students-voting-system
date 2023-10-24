import Image from "next/image";
import { heroData, functionalityData, reviews } from "@/models/data";
import Link from "next/link";

const LandingPage = () => {
  const startCount = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }

    return <div>{stars}</div>;
  };

  return (
    <div className="w-full h-[400px] max-mobile:h-[200px] relative">
      <div id="home" className=" w-full h-full shadow-2xl rounded-xl">
        <Image
          src={"/images/people-aligning.png"}
          alt="..."
          fill
          className="rounded-xl "
        />
        <span className=" absolute font-playFair max-mobile:font-andika max-mobile:font-extrabold text-[50px] w-3/4 max-mobile:w-3/4 p-3 pt-1 pl-4 max-mobile:text-[20px] max-md:text-[30px] max-md:w-3/4">
          <span className="text-primary-zetecBlue ">Zetech University</span>{" "}
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

      <div className="w-full font-andika my-10 max-mobile:text-center">
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
        <div className="w-full grid grid-cols-3 max-mobile:grid-cols-1 gap-2 p-10 max-mobile:p-2 max-mobile:mr-4">
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

      <p className=" w-full font-bold text-center text-[25px]">
        Your elections. Any device. Any location. On time. With Notification and
        Support.
      </p>
      <div className="w-full grid grid-cols-3 max-mobile:grid-cols-1 gap-2 p-10 max-mobile:p-2 max-mobile:mr-4">
        {functionalityData.map((item, index) => (
          <div
            key={`${item.title}`}
            className="flex flex-col items-center justify-center border rounded-xl w-[300px] shadow-2xl p-2"
          >
            <Image
              src={item.icon}
              alt={`${item.title} functionality`}
              width={40}
              height={40}
            />
            <p className="flex flex-col text-center">
              <span className=" font-bold text-black text-[20px]">
                {item.title}
              </span>
              <span className=" font-light text-black">{item.desc}</span>
            </p>
          </div>
        ))}
      </div>

      <p
        id="reviews"
        className="w-full font-bold text-[30px] text-center mt-12"
      >
        What active users think.
      </p>
      <div className=" grid grid-cols-2 gap-3 max-mobile:grid-cols-1">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="flex flex-col gap-2 border shadow-lg p-4 h-full justify-between"
          >
            <p className="">{review.text}</p>
            <span className="flex flex-row gap-3 justify-end">
              {startCount(review.stars)} {review.name}
            </span>
          </div>
        ))}
      </div>

      <footer className="w-full h-[400px] bg-slate-900 mt-20 grid grid-cols-3 mobile:p-20 max-mobile:p-5 gap-5 text-white relative">
        <div className=" flex flex-col gap-5">
          <Link href={"https://www.zetech.ac.ke/"} target="_blank">
            <Image
              src={"/images/zetech-logo.png"}
              alt="Zetec logo at the webpage footer"
              width={150}
              height={150}
            />
          </Link>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="#home" className=" underline hover:text-gray-500">
                Home
              </a>
            </li>
            <li>
              <a href="#reviews" className="underline hover:text-gray-500">
                Reviews
              </a>
            </li>
            <li>
              <a className="underline hover:text-gray-500">Contacts</a>
            </li>
          </ul>
        </div>
        <div className="max-mobile:mt-12 mt-20">
          <ul className="flex flex-col gap-3">
            <li className="">
              <a href="" className="underline hover:text-gray-500">
                Blog
              </a>
            </li>
            <li className="">
              <a href="" className="underline hover:text-gray-500">
                Login
              </a>
            </li>
            <li className="">
              <a href="" className="underline hover:text-gray-500">
                Register
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-20 max-mobile:mt-12">
          <ul className="flex flex-col gap-3">
            <li>
              <a href="" className="underline hover:text-gray-500">
                Support
              </a>
            </li>
            <li>
              <a href="" className="underline hover:text-gray-500">
                Knowledge Base
              </a>
            </li>
            <li>
              <a href="" className="underline hover:text-gray-500">
                Forum
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full flex flex-row max-mobile:flex-col absolute bottom-0 justify-between px-5 py-3">
          <span className="">
            &copy; 2023.{" "}
            <a
              href="https://portfolio.jaweki.com"
              target="_blank"
              className="cursor-pointer underline hover:text-gray-500"
            >
              Jaweki Dev Group
            </a>
          </span>
          <span className="">
            <a className=" cursor-pointer underline hover:text-gray-500">
              Terms of service
            </a>{" "}
            |{" "}
            <a className="cursor-pointer underline hover:text-gray-500">
              Privacy Policy
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
