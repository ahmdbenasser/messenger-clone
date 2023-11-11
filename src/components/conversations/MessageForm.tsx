"use client";

import { BsImage } from "react-icons/bs";
import MessageInput from "./MessageInput";
import { FieldValues, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";

import { HiPaperAirplane } from "react-icons/hi2";
import axios from "axios";
import useConversation from "@/hooks/useConversation";

const FormMessage = () => {
  const { conversationId } = useConversation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: FieldValues) => {
    setValue("message", "", { shouldValidate: true });
    axios.post(`/api/messages`, {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = async (result: any) => {
    await axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId,
    });
  };
  return (
    <div
      className="
        py-3 
        px-4 
        flex 
        gap-2
        lg:gap-4
        items-center
        border-t-[1px]
      "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        uploadPreset="messenger-clone"
        onUpload={handleUpload}
      >
        <BsImage
          className="
        transition
        text-sky-500
        cursor-pointer
        hover:text-sky-600
        "
          size={30}
        />
      </CldUploadButton>
      <div className="w-full">
        <form
          className="flex items-center gap-2 lg:gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <MessageInput
            register={register}
            id="message"
            errors={errors}
            required
            type="text"
          />
          <button
            className="
              text-white
              bg-sky-500
              hover:bg-sky-600
              transition
              rounded-full
              p-2
            "
            type="submit"
          >
            <HiPaperAirplane size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormMessage;
