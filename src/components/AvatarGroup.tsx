"use client";

import { User } from "@prisma/client";
import Image from "next/image";

type Props = {
  users?: User[];
};
const AvatarGroup = ({ users = [] }: Props) => {
  const sliceUsers = users.slice(0, 3);
  const positionMap = {
    0: `top-0 left-[12px]`,
    1: `bottom-0 left-0`,
    2: `bottom-0 right-0`,
  };

  return (
    <div className="relative w-11 h-11">
      {sliceUsers.map((user, index) => {
        return (
          <div
            className={`
              absolute
              rounded-full
              h-[21px]
              w-[21px]
              overflow-hidden
              
              ${positionMap[index as keyof typeof positionMap]}
            `}
            key={user.id}
          >
            <Image
              fill
              src={user?.image || "/images/placeholder.png"}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

export default AvatarGroup;
