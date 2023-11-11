"use client";

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type Props = {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
};

const Input = ({
  id,
  label,
  type = "text",
  register,
  required,
  errors,
  disabled,
}: Props) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          block
          text-sm
          leading-8
          font-semibold
          text-gray-900
        "
      >
        {label}
      </label>
      <input
        type={type}
        className={`
          px-2
          block
          w-full
          py-1.5
          ring-1
          text-sm
          border-0
          shadow-sm 
          rounded-md
          ring-inset
          sm:leading-6
          focus:ring-2
          ring-gray-300
          focus:ring-inset
          focus:outline-none
          focus:ring-sky-600
          placeholder:text-gray-400
          ${errors[id] ? "ring-red-500" : ""}
          ${disabled ? "opacity-50 select-none" : ""}
        `}
        {...register(id, { required })}
      />
    </div>
  );
};

export default Input;
