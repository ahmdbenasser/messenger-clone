"use client";

type Props = {
  danger?: boolean;
  secondry?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
};

const Button = ({
  children,
  onClick,
  danger,
  disabled,
  fullWidth,
  secondry,
}: Props) => {
  return (
    <button
      className={`
        px-3
        py-2
        text-sm
        rounded-md
        font-semibold
        flex justify-center
        ${fullWidth && "w-full"}
        ${disabled && "opacity-50 cursor-not-allowed"}
        ${secondry ? "text-gray-900" : "text-white"}
        ${
          danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-500"
        }
        ${
          !danger &&
          !secondry &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 "
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
