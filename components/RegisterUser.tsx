"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { RegistrationStatusObject } from "@/types/types";
import ImageUpload from "./ImageUpload";

const RegisterUser = ({
  userRole,
  setStatus,
}: {
  userRole: string;
  setStatus: (obj: RegistrationStatusObject) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [valid, setValid] = useState(true);
  const [accKey, setAccKey] = useState("");
  const [input, setInput] = useState({
    regNo: "",
    name: "",
    email: "",
    password: "",
    repassword: "",
    avatar: "",
  });

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name == "repassword" && value !== input.password) {
      setValid(false);
    } else if (name == "repassword" && value == input.password) {
      setValid(true);
    }

    if (name == "password" && value !== input.repassword) {
      setValid(false);
    } else if (name == "password" && value == input.repassword) {
      setValid(true);
    }

    setInput({ ...input, [name]: value });
  };

  const uploadImage = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "voting-system");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/jaweki-cloudinary/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        return data.secure_url;
      } catch (error) {
        // console.error("Error uploading image: ", error);
        alert("Technical Failure before submit... Error Uploading image!");
      }
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert("Please upload an image!");
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const avatar_url = await uploadImage();

      const payloadData = new FormData();
      payloadData.append("userId", input.regNo);
      payloadData.append("name", input.name);
      payloadData.append("email", input.email);
      payloadData.append("password", input.password);
      payloadData.append("avatar", avatar_url);
      payloadData.append("role", userRole);
      if (userRole === "admin") {
        payloadData.append("accessKey", accKey);
      }
      // Don't append 'repassword' as it's not needed

      const response = await fetch("/api/register-new-user", {
        method: "POST",
        body: payloadData,
        signal,
      });
      // If the request does not receive a response within 60 seconds, abort it.
      setTimeout(() => {
        controller.abort();
      }, 60000);
      const data = await response.json();

      if (response.status == 201) {
        setStatus({ type: "success", email: input.email, error: "" });
      } else {
        console.error("Failed to register new user.");
        setStatus({ type: "failed", email: "", error: data.fail_message });
      }
    } catch (error) {
      console.log("Error trying to register user. ", error);
      setStatus({
        type: "failed",
        email: "",
        error: "Server communication fail. try again later",
      });
      return;
    }
  };

  return (
    <div className={` flex flex-col  items-center w-full bg-neutral-magnolia`}>
      <p
        className={`${
          userRole === "student" ? "" : "hidden"
        } font-semibold mobile:text-[30px] mobile:font-extrabold text-center`}
      >
        Register With us to be part of the change.
      </p>
      <p
        className={`${
          userRole === "staff" ? "" : "hidden"
        } font-semibold mobile:text-[30px] mobile:font-extrabold text-center`}
      >
        Register as an institutions staff and help inspire logically guided
        development.
      </p>
      <p
        className={`${
          userRole === "admin" ? "" : "hidden"
        } font-semibold mobile:text-[30px] mobile:font-extrabold text-center mobile:-mt-5`}
      >
        Go ahead and Get Registered as an Administrator.
      </p>
      <form
        onSubmit={handleFormSubmit}
        className=" font-andika bg-slate-900 max-mobile:w-[95%] max-mobile:h-[90%] max-mobile:mt-3 w-[500px] h-[90%]  rounded-xl shadow-2xl p-3 mobile:grid mobile:grid-cols-2 max-mobile:flex max-mobile:flex-col max-mobile:mb-10 gap-3"
      >
        <label className="">
          <span
            className={`${userRole === "student" ? "" : "hidden"} text-white`}
          >
            Students number
          </span>
          <span
            className={`${
              userRole === "admin" || userRole === "staff" ? "" : "hidden"
            } text-white`}
          >
            Employment Id
          </span>
          <input
            type="text"
            name="regNo"
            required
            placeholder="e.g. E020-11-3113/2020"
            value={input.regNo}
            onChange={handleValueChange}
            className="w-full p-4 rounded-md border focus:outline-white bg-transparent text-white"
          />
        </label>
        <label className="">
          <span className=" text-white">Full name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. John Doe"
            value={input.name}
            onChange={handleValueChange}
            className="w-full p-4 rounded-md border focus:outline-white bg-transparent text-white"
          />
        </label>
        <label className="">
          <span className=" text-white">Email</span>
          <input
            type="text"
            name="email"
            required
            placeholder="e.g. johndoe@lorem.com"
            value={input.email}
            onChange={handleValueChange}
            className="w-full p-4 rounded-md border focus:outline-white bg-transparent text-white"
          />
        </label>
        <label className="">
          <span className=" text-white">Set Password</span>
          <input
            type="password"
            name="password"
            required
            placeholder="e.g. 8-digit password"
            value={input.password}
            onChange={handleValueChange}
            className={`w-full p-4 rounded-md bg-transparent text-white${
              !valid
                ? " focus:outline-red-500 focus:outline-offset-2 border border-red-600 "
                : " border border-white"
            } `}
          />
        </label>
        <label className="">
          <span className=" text-white">
            Repeat password{" "}
            <span
              className={`${
                !valid ? "text-red-600 text-[12px] font-light" : "hidden"
              }`}
            >
              {" "}
              not a match
            </span>
          </span>
          <input
            type="password"
            name="repassword"
            required
            placeholder="e.g. 8-digit password"
            value={input.repassword}
            onChange={handleValueChange}
            className={`w-full p-4 rounded-md bg-transparent text-white${
              !valid
                ? " focus:outline-red-500 focus:outline-offset-2 border border-red-600 "
                : " border border-white"
            } `}
          />
        </label>

        <label className={`${userRole === "student" ? "hidden" : ""}`}>
          <span className=" text-white">Registration Key</span>
          <input
            type="text"
            name="accessKey"
            // required
            placeholder=".i.e. provided access key"
            value={accKey}
            onChange={(e) => setAccKey(e.target.value)}
            className={`w-full p-4 rounded-md border focus:outline-white bg-transparent  text-white ${
              userRole === "student" ? "hidden" : ""
            }`}
          />
        </label>

        <label className=" w-full flex flex-col gap-3 mt-3 col-span-2">
          <span className=" text-white">Profile photo:</span>
          <ImageUpload file={file} setFile={setFile} />
        </label>

        <button
          type="submit"
          className="rounded-lg hover:bg-blue-950 bg-slate-950 text-white h-[40px] font-extrabold leading-loose mt-4 mb-2 col-span-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
