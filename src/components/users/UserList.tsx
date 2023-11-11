"use client";

import { HiUserPlus } from "react-icons/hi2";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

type Props = {
  users: User[];
};

const UserList = ({ users }: Props) => {
  return (
    <aside
      className="
        border-r-[1px]
        fixed
        w-full
        inset-y-0
        lg:left-20
        lg:w-80
        p-4
      
      "
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">People</h1>
        <span
          className="
            flex 
            p-2 
            items-center 
            rounded-full
            justify-center 
            bg-gray-100 
          "
        >
          <HiUserPlus />
        </span>
      </div>
      <div className="flex flex-col justify-between">
        {users.map((item) => {
          return <UserBox data={item} key={item.id} />;
        })}
      </div>
    </aside>
  );
};

export default UserList;
