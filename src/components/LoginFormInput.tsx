import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const LoginFormInput: React.FC<InputProps> = ({
  className = "",
  type = "text",
  ...props
}) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-[#62626b] placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9414ff] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

export default LoginFormInput;
