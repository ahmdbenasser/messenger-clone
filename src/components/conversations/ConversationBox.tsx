"use client";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import { FullConversationType } from "@/app/types";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useOtherUser from "@/hooks/useOtherUser";
import AvatarGroup from "../AvatarGroup";

type Props = {
  data: FullConversationType;
  select?: boolean;
};
const ConversationBox = ({ data, select }: Props) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [router, data?.id]);

  const lastMessage = useMemo(() => {
    const messages = data?.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Start the conversation";
  }, [lastMessage]);

  const currentEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArr = lastMessage.seen || [];
    return (
      seenArr.filter((item) => item.email === currentEmail)
        .length !== 0
    );
  }, [currentEmail, lastMessage]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  return (
    <div
      className={`
        p-3
        cursor-pointer
        transition
        hover:bg-gray-100
        rounded-md
        mb-2
        ${select && "bg-gray-100"}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between gap-2">
        {data.isGroup ? (
          <AvatarGroup users={data.users} key={data.id} />
        ) : (
          <Avatar user={otherUser} key={data.id} />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h2 className=" font-bold text-gray-900">{title}</h2>
            {lastMessage?.createdAt && (
              <span className="text-xs font-light">
                {format(new Date(lastMessage?.createdAt), "p")}
              </span>
            )}
          </div>
          <p
            className={`font-medium truncate
              ${
                hasSeen
                  ? "text-gray-500"
                  : "text-black font-semibold"
              }
            `}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
