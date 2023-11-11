"use client";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import { FiAlertTriangle } from "react-icons/fi";
import Button from "../Button";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
};

const ConfirmModal = ({ onClose, isOpen }: Props) => {
  const [loading, setLoading] = useState(false);
  const { conversationId } = useConversation();
  const router = useRouter();

  const handleDelete = useCallback(async () => {
    setLoading(true);
    await axios
      .delete(`/api/conversations/${conversationId}`)
      .then((res) => {
        router.push("/conversations");
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  }, [conversationId, router, onClose]);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="flex  gap-3">
        <div
          className="
            p-2 
            rounded-full
            bg-red-100 
            flex items-center justify-center
            w-12
            h-12
            sm:w-10
            sm:h-10
          "
        >
          <FiAlertTriangle className="text-red-500 h-6 w-6" />
        </div>
        <div className="flex  flex-col gap-3">
          <h3 className="text-xl font-bold">Delete Conversation</h3>
          <p className="text-sm text-gray-500 font-semibold">
            Are you sure you want to delete this conversation? This
            action cannot be undone.
          </p>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-3 mt-3">
        <Button onClick={handleDelete} danger disabled={loading}>
          Delete
        </Button>
        <Button onClick={onClose} secondry disabled={loading}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
