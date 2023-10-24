import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-[400px] bg-slate-900 mt-20 grid grid-cols-3 mobile:p-20 max-mobile:p-5 gap-5 text-white relative -bottom-[300vh] max-mobile:-bottom-[700vh]">
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
  );
};

export default Footer;
