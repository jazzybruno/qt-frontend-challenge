import { IUser } from "@/types/user.type";
import { Avatar, Divider } from "@mantine/core";
import { FC } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

interface Props {
  user: IUser | null;
}

const ViewUser: FC<Props> = ({ user }) => {
  return (
    <div className="flex flex-col p-3 items-center w-full">
      <div className="flex flex-col gap-y-2 items-center">
        <Avatar
          size={"xl"}
          src={`https://ui-avatars.com/api/?name=${user?.name}+${user?.email}&bold=true`}
        />
        <div className="flex items-center w-full flex-col">
          <p className="text-lg font-semibold ">{user?.name}</p>
          <p className=" opacity-80">{user?.email}</p>
        </div>
      </div>
      <Divider w={"100%"} my={"md"} />
      <div className="flex w-full flex-col gap-y-3">
        <h1 className=" font-semibold text-lg">Contact Info</h1>
        <div className="flex flex-col gap-y-2 text-slate-500 w-full">
          <div className="flex items-center gap-x-2">
            <FaEnvelope />
            <p>{user?.email}</p>
          </div>
          <Divider w={"100%"} />
          <div className="flex items-center gap-x-2">
            <FaPhoneAlt />
            <p>{user?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
