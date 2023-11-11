import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
  conversatoin: FullConversationType | { users: User[] }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser = conversatoin.users.filter(
      (item) => item.email !== currentUserEmail
    );

    return otherUser[0];
  }, [session.data?.user?.email, conversatoin]);

  return otherUser;
};

export default useOtherUser;
