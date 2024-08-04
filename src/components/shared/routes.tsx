import { MenuSquareIcon, Nut, UserCircleIcon } from "lucide-react";
import {FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

interface Route {
  icon: any;
  name: string;
  path: string;
  isPublic?: boolean;
}

export const UserRoutes: Route[] = [
  {
    icon: <MdDashboard size={20} />,
    name: "DashBoard",
    path: "/dashboard",
  },
  {
    icon: <FaUsers size={20} />,
    name: "Users",
    path: "/users",
  },
  {
    icon: <MenuSquareIcon className="w-5" />,
    name: "Employee",
    path: "/employee",
  },
  {
    icon: <UserCircleIcon size={20} />,
    name: "Account",
    path: "/account",
    isPublic: true,
  },
];


