"use client";

import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import {
  HiChevronLeft,
  HiEllipsisHorizontal,
} from "react-icons/hi2";

import useOtherUser from "@/hooks/useOtherUser";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "../AvatarGroup";
import useActiveListStore from "@/hooks/useActiveListStroe";

type Props = {
  conversation: Conversation & {
    users: User[];
  };
};
const Header = ({ conversation }: Props) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session.status, router]);

  const otherUser = useOtherUser(conversation);

  const { members } = useActiveListStore();
  const isActive = members.indexOf(otherUser.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation]);

  const title = useMemo(() => {
    return conversation.name || otherUser.name;
  }, [conversation.name, otherUser.name]);

  return (
    <>
      <ProfileDrawer
        conversation={conversation}
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      />
      <div
        className="
        px-4 
        py-3
        sm:px-4 
        lg:px-6 
        shadow-sm
        border-b-[1px]
        flex justify-between items-center
      "
      >
        <div className="flex items-center gap-3">
          <Link
            href={"/conversations"}
            className="
            transition
            text-sky-500
            cursor-pointer
            lg:hidden block
            hover:text-sky-600
          "
          >
            <HiChevronLeft size={30} />
          </Link>

          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{title}</h2>
            <span className="font-light text-neutral-500">
              {statusText}
            </span>
          </div>
        </div>
        <HiEllipsisHorizontal
          onClick={() => setIsOpenDrawer(true)}
          className="cursor-pointer text-sky-500 hover:text-sky-600 transition"
          size={32}
        />
      </div>
    </>
  );
};

export default Header;
