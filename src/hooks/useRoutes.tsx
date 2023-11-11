import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { HiChat } from "react-icons/hi";
import { HiUsers, HiArrowLeftOnRectangle } from "react-icons/hi2";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        icon: HiChat,
        href: "/conversations",
        active: pathname === "/conversations",
      },
      {
        label: "Users",
        icon: HiUsers,
        href: "/users",
        active: pathname === "/users",
      },
      {
        label: "Logout",
        icon: HiArrowLeftOnRectangle,
        href: "#",
        onClick: () => signOut(),
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
