import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
  label: string;
  icon: IconType;
  href: string;

  active?: boolean;
  onClick?: () => void;
};

const MobileItem = ({ href, icon: Icon, label, active, onClick }: Props) => {
  const handleOnClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      className={`
        w-full
        p-4
        text-gray-500
        hover:text-gray-900
        hover:bg-gray-100
        transition
        rounded-md
        flex justify-center items-center
        ${active && "text-gray-900 bg-gray-100"}
      `}
      href={href}
      onClick={handleOnClick}
    >
      <Icon />
    </Link>
  );
};

export default MobileItem;
