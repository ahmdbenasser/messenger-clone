"use client";

import { FieldValues, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { User } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  currentUser?: User | null;
};
const SettingsModal = ({ onClose, isOpen, currentUser }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    await axios
      .put(`/api/settings`, data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="
          flex
          flex-col 
          gap-6
        "
      >
        <div>
          <h3 className="font-bold text-gray-900">Profile</h3>
          <p className="text-gray-500 font-semibold text-sm mt-1">
            Edit your public information
          </p>
        </div>

        <form className="space-y-12">
          <div className="flex flex-col gap-2">
            <Input
              register={register}
              errors={errors}
              id="name"
              label="Name"
              type="text"
              disabled={loading}
              required
            />
          </div>

          <div
            className="
              flex 
              flex-col 
              gap-2 
              pb-12 border-b
            border-b-gray-200
            "
          >
            <label
              className="
                font-semibold 
                leading-8
                text-gray-900 text-sm 
              "
            >
              Photo
            </label>
            <div className="flex gap-3">
              <Image
                className="rounded-full"
                src={
                  image ||
                  currentUser?.image ||
                  "/images/placeholder.jpg"
                }
                alt="avatar"
                width="48"
                height="48"
              />
              <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="messenger-clone"
              >
                <Button secondry type="button">
                  Change
                </Button>
              </CldUploadButton>
            </div>
          </div>

          <div
            className="
              flex flex-row-reverse gap-3
            "
          >
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
            <Button onClick={onClose} secondry>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SettingsModal;
