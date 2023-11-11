import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import ActiveStatus from "../ActiveStatus";

type Props = {
  children: React.ReactNode;
};
const Sidebar = async ({ children }: Props) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <ActiveStatus />

      <DesktopSidebar currentUser={currentUser} />
      <MobileSidebar />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};

export default Sidebar;
