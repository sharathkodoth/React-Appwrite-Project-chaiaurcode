import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login as storeLogin } from "../features/authSlice";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      } else {
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full mt-8 font-mono">
      <div className="mx-auto w-full max-w-lg bg-white rounded-2xl p-10 shadow-lg">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center font-semibold text-2xl leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-white/70">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mt-8">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-7">
          <div className="space-y-5">
            <Input
              label="Email: "
              className="border-2 focus:border-zinc-800"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              className="border-2 focus:border-zinc-800"
              placeholder="enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full hover:bg-blue-600 duration-300"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
