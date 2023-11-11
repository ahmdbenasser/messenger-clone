"use client";

import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";
import useConversation from "@/hooks/useConversation";

const MobileSidebar = () => {
  const routes = useRoutes();

  const { isOpen } = useConversation();
  if (isOpen) {
    return null;
  }
  return (
    <div
      className="
        lg:hidden
        w-full
        fixed
        z-40
        flex 
        bottom-0
        items-center
        border-t-[1px]
        justify-between
      "
    >
      {routes.map((item) => {
        return (
          <MobileItem
            icon={item.icon}
            key={item.label}
            href={item.href}
            label={item.label}
            active={item.active}
            onClick={item.onClick}
          />
        );
      })}
    </div>
  );
};

export default MobileSidebar;
