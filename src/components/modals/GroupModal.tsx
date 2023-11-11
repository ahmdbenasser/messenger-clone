"use client";

import { User } from "@prisma/client";
import Modal from "./Modal";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import Select from "../inputs/Select";
import Button from "../Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  users?: User[];
};

const GroupModal = ({ isOpen, onClose, users = [] }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit = (data: FieldValues) => {
    setLoading(true);
    axios
      .post(`/api/conversations`, {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className=" pb-12 border-b border-b-green-200">
            <div className="mb-12">
              <h3 className="font-bold text-lg text-gray-900  ">
                Create a group chat
              </h3>
              <p className="mt-1 text-sm text-gray-500 font-medium">
                Create a chat with more than 2 people
              </p>
            </div>
            <div className="flex flex-col gap-y-8">
              <Input
                register={register}
                errors={errors}
                id="name"
                label="Name"
                disabled={loading}
                type="text"
                required
              />
              <Select
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                disabled={loading}
                value={members}
                onChange={(value: any) => {
                  {
                    setValue("members", value, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-row-reverse items-center gap-6">
            <Button disabled={loading} type="submit">
              Create
            </Button>
            <Button
              disabled={loading}
              type="button"
              onClick={onClose}
              secondry
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default GroupModal;
