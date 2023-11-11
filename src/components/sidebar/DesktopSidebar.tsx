"use client";

import useRoutes from "@/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "../modals/SettingsModal";
import { useState } from "react";

type Props = {
  currentUser?: User | null;
};

const DesktopSidebar = ({ currentUser }: Props) => {
  const routes = useRoutes();

  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);

  return (
    <>
      <SettingsModal
        isOpen={isOpenSettingModal}
        onClose={() => setIsOpenSettingModal(false)}
        currentUser={currentUser}
      />
      <div
        className="
          hidden
          lg:fixed
          lg:z-40
          lg:w-20
          lg:pb-4
          xl:px-6
          lg:inset-y-0
          lg:border-r-[1px]
          lg:overflow-y-auto
          lg:flex lg:flex-col lg:justify-between
        "
      >
        <nav className="flex flex-col items-center justify-between">
          <ul
            className="flex flex-col items-center justify-between"
            role="list"
          >
            {routes.map((item) => {
              return (
                <DesktopItem
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={item.active}
                  key={item.label}
                  onClick={item.onClick}
                />
              );
            })}
          </ul>
        </nav>

        <nav className="flex flex-col justify-between items-center">
          <div
            className="cursor-pointer hover:opacity-70 transition"
            onClick={() => setIsOpenSettingModal(true)}
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
