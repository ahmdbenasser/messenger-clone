import getConversationById from "@/app/actions/getConversationById";
import EmptyState from "@/components/EmptyState";
import Body from "@/components/conversations/Body";
import MessageForm from "@/components/conversations/MessageForm";
import Header from "@/components/conversations/Header";
import getMessages from "@/app/actions/getMessages";

type TParams = {
  conversationId: string;
};
const ConversationPage = async ({ params }: { params: TParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  if (!conversation) {
    return (
      <div className="lg:pl:80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full ">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <MessageForm />
      </div>
    </div>
  );
};

export default ConversationPage;
