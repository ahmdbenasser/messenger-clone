"use client";

import { User } from "@prisma/client";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingModal from "../modals/LoadingModal";

type Props = {
  data: User;
};

const UserBox = ({ data }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleOnClick = useCallback(() => {
    setLoading(true);
    axios
      .post(`/api/conversations`, {
        userId: data.id,
      })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
      })
      .finally(() => setLoading(false));
  }, [router, data.id]);

  return (
    <>
      {loading && <LoadingModal />}
      <div
        className="
        p-4
        gap-3
        rounded-xl
        cursor-pointer
        hover:bg-gray-100
        flex items-center justify-between 
      "
        onClick={handleOnClick}
      >
        <Avatar user={data} />
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">
            {data.name}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserBox;
