import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  type: string;
  required: boolean;
  errors: FieldErrors;
  id: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
};

const MessageInput = ({
  errors,
  register,
  required,
  type = "text",
  placeholder,
  id,
}: Props) => {
  return (
    <div className="w-full">
      <input
        className="
        w-full
        py-2
        px-3
        text-black
        rounded-full
        outline-none
        bg-neutral-100
        focus:outline-none
        "
        type={type}
        {...register(id, { required })}
        placeholder={"Write a message"}
      />
    </div>
  );
};

export default MessageInput;
