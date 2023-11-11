import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (params?.conversationId) {
      return params?.conversationId;
    } else {
      return "";
    }
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return {
    conversationId,
    isOpen,
  };
};

export default useConversation;
