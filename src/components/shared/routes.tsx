import { MenuSquareIcon, UserCircleIcon } from "lucide-react";
import {FaUsers , FaRegFilePowerpoint , FaInstagram } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

interface Route {
  icon: any;
  name: string;
  path: string;
  isPublic?: boolean;
}

export const UserRoutes: Route[] = [
  {
    icon: <FaUsers size={20} />,
    name: "Users",
    path: "/users",
  },
  {
    icon: <FaInstagram className="w-5" />,
    name: "Posts",
    path: "/posts",
    isPublic: true
  },
  {
    icon: <FaRegFilePowerpoint className="w-5" />,
    name: "Abuse Reports",
    path: "/report",
  },
  {
    icon: <UserCircleIcon size={20} />,
    name: "Account",
    path: "/account",
    isPublic: true,
  },
];


