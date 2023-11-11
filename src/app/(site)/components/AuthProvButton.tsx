"use client";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  disabled?: boolean;
  onClick: () => void;
};

const AuthProvButton = ({ icon: Icon, onClick, disabled }: Props) => {
  return (
    <button
      className={`
        w-full
        ring-1
        px-4  
        py-2
        ring-inset
        inline-flex
        justify-center
        items-center
        rounded-md
        bg-white
        ring-gray-300
        text-gray-500
        hover:bg-gray-50
        
        ${disabled && "opacity-50 cursor-not-allowed"}  
      `}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default AuthProvButton;
