"use client";

import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { pusherClient } from "@/utils/pusher";

type Props = {
  initialMessages: FullMessageType[];
};

const Body = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    const request = async () => {
      await axios.post(`/api/conversations/${conversationId}/seen`);
    };

    request();
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId as string);
    bottomRef?.current?.scrollIntoView();

    // this recive the new message from the pusherServer
    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((prev) => {
        // to prevent duplicate
        if (prev.find((item) => item.id === message.id)) {
          return prev;
        }
        return [...prev, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (
      lastMessageUpdate: FullMessageType
    ) => {
      setMessages((prev) =>
        prev.map((item) => {
          if (item.id === lastMessageUpdate.id) {
            return lastMessageUpdate;
          }
          return item;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId as string);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => {
        return (
          <MessageBox
            key={message.id}
            message={message}
            isLast={i === messages?.length - 1}
          />
        );
      })}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
