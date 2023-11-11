import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import Avatar from "../Avatar";
import format from "date-fns/format";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "../modals/ImageModal";

type Props = {
  message: FullMessageType;
  isLast?: boolean;
};
const MessageBox = ({ message, isLast }: Props) => {
  const session = useSession();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const isOwnMsg =
    session.data?.user?.email === message?.sender?.email;

  const seenList = (message.seen || [])
    .filter((item) => item.email !== message.sender.email)
    .map((user) => user.name);

  return (
    <div className={`flex gap-3 p-4 ${isOwnMsg && "justify-end"}`}>
      {/* avatar */}
      <div className={`${isOwnMsg /**/ && "order-2"}`}>
        <Avatar user={message.sender} />
      </div>

      {/* Message Body */}
      <div
        className={`flex flex-col gap-2 ${isOwnMsg && "items-end"}`}
      >
        {/* Sender name & CreatedAt */}
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {message.sender.name}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
          {/* end Sender name & CreatedAt */}
        </div>
        {/* Message Content (img, text)*/}
        <div
          className={`
            w-fit overflow-hidden text-lg
            ${isOwnMsg ? "bg-sky-500 text-white" : "bg-gray-100"}  
            ${
              message.image
                ? "rounded-md p-0"
                : "rounded-full py-2 px-3"
            }
          `}
        >
          {message.image ? (
            <>
              <ImageModal
                onClose={() => setIsImageModalOpen(false)}
                isOpen={isImageModalOpen}
                src={message.image}
              />
              <Image
                className="
                object-cover
                cursor-pointer
                hover:scale-110
                transition
              "
                src={message.image}
                alt="img"
                width="288"
                height="288"
                onClick={() => setIsImageModalOpen(true)}
              />
            </>
          ) : (
            <div className="">{message.body}</div>
          )}
        </div>
        {/* end Message Content (img, text)*/}

        {/* Show seen message  */}
        {isLast && isOwnMsg && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
        {/* end Show seen message  */}
      </div>
      {/* end Message Body */}
    </div>
  );
};

export default MessageBox;
