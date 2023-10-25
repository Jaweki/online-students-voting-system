"use client";

import { ChangeEvent, DragEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";

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
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
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
          className=" border-2 border-dashed border-white h-[100px] text-center rounded text-white cursor-pointer"
          onClick={handleSelectFile}
        >
          {file ? (
            <div className=" flex flex-col items-center justify-center">
              <p>Select Image:</p>
              <Image
                src={URL.createObjectURL(file)}
                alt="Selected Image"
                width={100}
                height={100}
                className=" rounded-xl "
              />
            </div>
          ) : (
            <p className="h-full flex flex-col justify-center text-center text-white font-bold ">
              Drag and drop an image or click to select one.
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

const RegisterUser = () => {
  const [file, setFile] = useState<File | null>(null);
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

    setInput({ ...input, [name]: value });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // To do.
  };

  const uploadImage = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        console.log("Image uploaded successfully: ", data);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  return (
    <div className="flex flex-col  items-center w-full bg-neutral-magnolia">
      <p className=" font-semibold mobile:text-[30px] mobile:font-extrabold">
        Register With us to be part of the change.
      </p>
      <form
        action=""
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
            className="w-full p-4 rounded-md border focus:outline-white bg-transparent font-playFair text-white"
          />
        </label>
        <label className="">
          <span className=" text-white">Repeat password</span>
          <input
            type="password"
            name="repassword"
            required
            placeholder="e.g. 8-digit password"
            value={input.repassword}
            onChange={handleValueChange}
            className="w-full p-4 rounded-md border focus:outline-white bg-transparent font-playFair text-white"
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
