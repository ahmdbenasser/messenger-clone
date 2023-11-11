import useActiveListStore from "@/hooks/useActiveListStroe";
import { User } from "@prisma/client";
import Image from "next/image";

type Props = {
  user?: User | null;
};

const Avatar = ({ user }: Props) => {
  const { members } = useActiveListStore();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative">
      <div
        className="
        relative  
        overflow-hidden
        rounded-full
        h-9
        w-9
        md:h-11
        md:w-11
        
      "
      >
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          fill
          alt="avatar"
        />
      </div>

      {isActive && (
        <span
          className="
            absolute
            top-0
            w-2
            h-2
            md:w-3
            md:h-3
            ring-2
            right-0
            rounded-full
            bg-green-500
            ring-white
          "
        />
      )}
    </div>
  );
};

export default Avatar;
