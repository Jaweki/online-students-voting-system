import { useRouter } from "next/navigation";

const RegistrationSuccess = ({ email }: { email: string }) => {
  const router = useRouter();

  return (
    <div className=" flex justify-center items-center bg-neutral-magnolia">
      <div className=" w-[300px] h-[400px] bg-slate-900 rounded-lg text-white flex flex-col items-center justify-center p-4 relative leading-loose shadow-2xl">
        <span className=" font-extrabold text-[19px]">Success !</span>
        <p className=" text-center leading-tight w-full">
          Your registration request was successful. Open your email:{" "}
          <span className=" text-gray-700 font-bold undeline">{email}</span> and
          click the confirm link to finalize your registration.
        </p>

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

export default RegistrationSuccess;
