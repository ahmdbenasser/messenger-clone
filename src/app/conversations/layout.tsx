import ConversationsList from "@/components/conversations/ConversationsList";
import Sidebar from "@/components/sidebar/Sidebar";
import getConversations from "../actions/getConversations";
import getAllUsers from "../actions/getAllUsers";

type Props = {
  children: React.ReactNode;
};
const ConversationLayout = async ({ children }: Props) => {
  const conversations = await getConversations();
  const users = await getAllUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationsList
          users={users}
          initialConversation={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationLayout;
