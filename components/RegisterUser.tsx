"use client";

import { ChangeEvent, DragEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { RegistrationStatusObject } from "@/types/types";

interface ImageUploadProps {
  file: File | null;
  setFile: (prop: File) => void;
}

const ImageUpload = ({ file, setFile }: ImageUploadProps) => {
  const [ismobile, setIsMobile] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile: File = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleSelectFile = () => {
    const fileInput = document.createElement("input") as HTMLInputElement;
    if (fileInput) {
      fileInput.type = "file";
      fileInput.style.display = "none";

      document.body.appendChild(fileInput);
      fileInput.click();

      fileInput.addEventListener("change", (event) => {
        return setFile(event.target?.files[0]);
      });
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile: File = e.dataTransfer.files[0];
    setFile(selectedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);
  return (
    <div>
      {!ismobile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className=" border-2 border-dashed border-white h-[100px] text-center rounded text-white cursor-pointer w-full"
          onClick={handleSelectFile}
        >
          {file ? (
            <div className=" flex flex-row justify-between pr-6 py-2 pl-2 items-center h-full  max-md:items-center w-full">
              <p className=" font-bold flex flex-col items-start max-md:hidden">
                <span className=" ">selected file:</span>
                <span className="underline text-gray-500 leading-tight">
                  {file.name}
                </span>
              </p>

              <Image
                src={URL.createObjectURL(file)}
                alt="Selected Image"
                width={75}
                height={80}
                className="rounded-xl"
              />
            </div>
          ) : (
            <p className="h-full w-full flex flex-col justify-center items-center text-center text-white font-bold ">
              Drag and drop an image or{" "}
              <span className=" w-[50px] bg-neutral-magnolia text-black font-bold rounded-lg">
                click
              </span>{" "}
              to select one.
            </p>
          )}
        </div>
      ) : (
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={handleFileChange}
          className=" w-full"
        />
      )}
    </div>
  );
};

const RegisterUser = ({
  setStatus,
}: {
  setStatus: (obj: RegistrationStatusObject) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [valid, setValid] = useState(true);
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
        console.log(formData);

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
        console.error("Error uploading image: ", error);
      }
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert("Please upload an image!");
      return;
    }

    try {
      const avatar_url = await uploadImage();

      const payloadData = new FormData();
      const properties = Object.getOwnPropertyNames(input);
      for (const prop of properties) {
        if (prop !== "repassword" && typeof prop === "string") {
          payloadData.append(prop, input[prop]!);
        }
      }
      payloadData.set("avatar", avatar_url);

      const response = await fetch("api/register-new-user", {
        method: "POST",
        body: payloadData,
      });

      const data = await response.json();

      if (response.status == 201) {
        console.log("Register new user response: ", data);
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
    <div className="flex flex-col  items-center w-full bg-neutral-magnolia">
      <p className=" font-semibold mobile:text-[30px] mobile:font-extrabold">
        Register With us to be part of the change.
      </p>
      <form
        onSubmit={handleFormSubmit}
        className=" bg-slate-900 max-mobile:w-[95%] max-mobile:h-[90%] max-mobile:mt-3 w-[50%] h-[90%] mt-1  rounded-xl shadow-2xl p-3 mobile:grid mobile:grid-cols-2 max-mobile:flex max-mobile:flex-col max-mobile:mb-10 gap-3"
      >
        <label className="">
          <span className=" text-white">Students number</span>
          <input
            type="text"
            name="regNo"
            required
            placeholder="e.g. E020-11-3113/2020"
            value={input.regNo}
            onChange={handleValueChange}
            className="w-full p-4 rounded-md border focus:outline-white bg-transparent font-playFair text-white"
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
            className="w-full p-4 rounded-md border focus:outline-white bg-transparent font-playFair text-white"
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
            className="w-full p-4 rounded-md border focus:outline-white bg-transparent font-playFair text-white"
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
            className={`w-full p-4 rounded-md bg-transparent font-playFair text-white${
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
            className={`w-full p-4 rounded-md bg-transparent font-playFair text-white${
              !valid
                ? " focus:outline-red-500 focus:outline-offset-2 border border-red-600 "
                : " border border-white"
            } `}
          />
        </label>
        <label className=" w-full flex flex-col gap-3 mt-3">
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
