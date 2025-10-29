"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MailIcon } from "@/components/icons/MailIcon";
import { LockIcon } from "@/components/icons/LockIcon";
import Button from "@/components/LoginButton";
import Input from "@/components/LoginFormInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Minimum  characters is 8")
    .required("Password is required"),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error(result.message || "Invalid email or password");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-9 w-full max-w-md p-8"
    >
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

      <Button
        type="submit"
        disabled={isLoading || Boolean(errors.email || errors.password)}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      <p className="text-[#62616b] text-sm text-center">
        Don't have an account?{" "}
        <span className="cursor-pointer hover:underline text-[#9414ff]">
          Sign up
        </span>
      </p>
    </form>
  );
}
