import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);
  const [input, setInput] = useState({
    credentialId: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
    setInvalid(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signIn("voting-system", {
      ...input,
      redirect: false,
    }).then((result) => {
      if (result?.ok) {
        router.push("/users");
      } else {
        setInvalid(true);
      }
    });
  };

  return (
    <div className=" bg-neutral-magnolia w-full h-[70vh] flex flex-col justify-center items-center">
      <div className="w-[300px] h-[400px] bg-slate-900 rounded-2xl shadow-2xl text-white p-4 flex  flex-col justify-center items-center">
        <span className=" text-center w-full text-[25px] font-extrabold text-gray-500">
          Login to Your Profile
        </span>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full  flex flex-col justify-center relative gap-8"
        >
          <span
            className={`${
              invalid ? "absolute top-3 text-red-500 text-[16px] " : "hidden"
            }`}
          >
            invalid Login.
          </span>
          <label className="">
            <span className="">Login Credentials</span>
            <input
              type="text"
              name="credentialId"
              required
              autoComplete="off"
              placeholder="i.e. Students/ Admins Id or email"
              value={input.credentialId}
              onChange={handleInputChange}
              className={`bg-transparent w-full h-[50px] p-3 rounded-lg border  font-playFair ${
                invalid ? " border-red-500" : "border-white"
              }`}
            />
          </label>
          <label className="">
            <span className="">Password</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="off"
              placeholder="i.e. 8-digit password"
              value={input.password}
              onChange={handleInputChange}
              className={`bg-transparent w-full h-[50px] p-3 rounded-lg border  font-playFair ${
                invalid ? " border-red-500" : "border-white"
              }`}
            />
          </label>

          <button
            type="submit"
            className=" bg-slate-950 text-white font-extrabold rounded-lg shadow-md w-[100px] h-[35px] hover:bg-blue-900"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
