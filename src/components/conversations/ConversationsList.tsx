"use client";
import { FullConversationType } from "@/app/types";
import useConversation from "@/hooks/useConversation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupModal from "../modals/GroupModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/utils/pusher";
import { useRouter } from "next/navigation";

type Props = {
  initialConversation: FullConversationType[];
  users: User[];
};

const ConversationsList = ({
  initialConversation,
  users,
}: Props) => {
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const { isOpen, conversationId } = useConversation();
  const [conversations, setConversations] = useState(
    initialConversation
  );

  const session = useSession();
  const router = useRouter();

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  useEffect(() => {
    if (!userEmail) {
      return;
    }
    const newConvsersationHandler = (
      newConversation: FullConversationType
    ) => {
      setConversations((prev) => [newConversation, ...prev]);
    };

    const updateConversationHandler = (
      updatedConversation: FullConversationType
    ) => {
      setConversations((prev) =>
        prev.map((item) => {
          if (item.id === updatedConversation.id) {
            return {
              ...item,
              messages: updatedConversation.messages,
            };
          }

          return item;
        })
      );
    };

    const removeConversationHandler = (
      removedConv: FullConversationType
    ) => {
      setConversations((prev) =>
        prev.filter((item) => item.id !== removedConv.id)
      );

      if (conversationId === removedConv.id) {
        router.push("/conversations");
      }
    };

    pusherClient.subscribe(userEmail);
    pusherClient.bind("conversation:new", newConvsersationHandler);
    pusherClient.bind(
      "conversation:update",
      updateConversationHandler
    );
    pusherClient.bind(
      "conversation:remove",
      removeConversationHandler
    );

    // clean up ==> unmount
    return () => {
      pusherClient.unsubscribe(userEmail);
      pusherClient.unbind(
        "conversation:new",
        newConvsersationHandler
      );
      pusherClient.unbind(
        "conversation:update",
        updateConversationHandler
      );
      pusherClient.unbind(
        "conversation:remove",
        removeConversationHandler
      );
    };
  }, [userEmail, conversationId, router]);

  return (
    <>
      <GroupModal
        isOpen={isGroupOpen}
        onClose={() => setIsGroupOpen(false)}
        users={users}
      />
      <aside
        className={`
        fixed
        w-full
        lg:w-80
        lg:left-20
        lg:block
        inset-y-0 
        border-r-[2px]
        overflow-y-auto
        ${isOpen && "hidden"}
      `}
      >
        <div className="px-5">
          <div className="pt-4 mb-4 flex justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Messages
            </h1>
            <span
              className="
              p-2 
              rounded-full 
              bg-gray-100 
              cursor-pointer
              hover:bg-gray-200
              flex conversation-center justify-center
            "
              onClick={() => setIsGroupOpen(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </span>
          </div>

          {conversations.map((item) => {
            return (
              <ConversationBox
                data={item}
                key={item.id}
                select={item.id === conversationId}
              />
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default ConversationsList;
