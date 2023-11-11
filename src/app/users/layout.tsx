import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/components/users/UserList";

import getAllUsers from "@/app/actions/getAllUsers";

type Props = {
  children: React.ReactNode;
};
const UserLayout = async ({ children }: Props) => {
  const users = await getAllUsers();
  return (
    <Sidebar>
      <UserList users={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default UserLayout;
