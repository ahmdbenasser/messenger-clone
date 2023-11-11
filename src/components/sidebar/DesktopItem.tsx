import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
  label: string;
  icon: IconType;
  href: string;
  active?: boolean;
  onClick?: () => void;
};

const DesktopItem = ({ href, icon: Icon, label, active, onClick }: Props) => {
  const handleOnClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li className="mt-4" onClick={handleOnClick}>
      <Link
        className={`
          p-3
          mb-1
          transition
          rounded-md
          text-gray-500
          hover:bg-gray-100
          hover:text-gray-900
          flex items-center justify-center
          ${active && "bg-gray-100 text-gray-900"}
        `}
        href={href}
      >
        <Icon className="h-6 w-6" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
