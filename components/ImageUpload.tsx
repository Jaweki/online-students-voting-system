import { ChangeEvent, useEffect, DragEvent, useState } from "react";
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
    const fileInput = document.createElement("input");
    if (fileInput) {
      fileInput.type = "file";
      fileInput.style.display = "none";

      document.body.appendChild(fileInput);
      fileInput.click();

      fileInput.addEventListener("change", (event: Event) => {
        // Get the first selected file.
        const target = event.target as HTMLInputElement;

        // Access the `files` property.
        const files = target.files as any;

        for (const file of files) {
          // If the file is not null, set it.
          if (file !== null) {
            setFile(file);
          }
        }
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

export default ImageUpload;
