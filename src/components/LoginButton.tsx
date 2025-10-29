import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const LoginButton: React.FC<ButtonProps> = ({
  children,
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full px-5 py-3 rounded-lg text-white text-base font-medium transition-colors duration-200
        ${
          disabled
            ? "bg-[#9414ff]/60 cursor-not-allowed"
            : "bg-[#9414ff] hover:bg-[#8412e0] cursor-pointer"
        }
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default LoginButton;
