import { useRouter } from "next/navigation";

const RegistrationFailed = ({ error }: { error: string }) => {
  const router = useRouter();

  return (
    <div className=" flex justify-center items-center bg-neutral-magnolia">
      <div className=" w-[300px] h-[400px] bg-slate-900 rounded-lg text-white flex flex-col items-center justify-center gap-4 shadow-2xl relative p-4">
        <span className=" font-extrabold text-[19px]">Failed !</span>
        <p className=" text-center leading-tight w-full">{error}</p>
        <a
          href="/users"
          className={`${
            error.toLowerCase().includes("server")
              ? "hidden"
              : "text-gray-700 underline font-semibold hover:text-blue-600 text-[20px]"
          }`}
        >
          Login
        </a>

        <button
          type="button"
          onClick={() => router.push("/")}
          className=" bg-slate-500 w-[80px] h-[40px] rounded-lg absolute bottom-5 hover:bg-blue-600"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default RegistrationFailed;
