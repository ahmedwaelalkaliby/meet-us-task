"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MailIcon } from "@/components/icons/MailIcon";
import { LockIcon } from "@/components/icons/LockIcon";
import Button from "@/components/LoginButton";
import Input from "@/components/LoginFormInput";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum  characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <form className="flex flex-col items-center justify-center gap-9 w-full max-w-md p-8">
      <div className="flex flex-col items-center gap-2 w-full">
        <h1 className="text-[#1a1a1d] text-4xl md:text-5xl font-normal text-center">
          Welcome back
        </h1>
        <p className="text-[#62616b] text-base md:text-lg font-normal text-center">
          Step into our shopping metaverse for an unforgettable shopping
          experience
        </p>
      </div>

      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white/30 backdrop-blur-sm transition-all focus-within:ring-2 focus-within:ring-[#9414ff]">
            <MailIcon className="w-6 h-6 text-[#62626b]" />
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="border-0 bg-transparent p-0 h-auto shadow-none text-[#62626b] text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white/30 backdrop-blur-sm transition-all focus-within:ring-2 focus-within:ring-[#9414ff]">
            <LockIcon className="w-6 h-6 text-[#62626b]" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="border-0 bg-transparent p-0 h-auto shadow-none text-[#62626b] text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit">Login</Button>

      <p className="text-[#62616b] text-sm text-center">
        Don't have an account?{" "}
        <span className="cursor-pointer hover:underline text-[#9414ff]">
          Sign up
        </span>
      </p>
    </form>
  );
}
