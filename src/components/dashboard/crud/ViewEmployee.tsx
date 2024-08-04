import { EmployeeLaptop } from "@/types/employee-laptop.type";
import { IUser } from "@/types/user.type";
import { Avatar, Divider } from "@mantine/core";
import { FC } from "react";
import { FcDepartment } from "react-icons/fc";
import { GiShieldOpposition } from "react-icons/gi";
import { MdComputer } from "react-icons/md";
import { RxBoxModel } from "react-icons/rx";
import { FaEnvelope, FaIndustry, FaPhoneAlt , FaYandexInternational } from "react-icons/fa";

interface Props {
  employee: EmployeeLaptop | null;
}

const ViewEmployee: FC<Props> = ({ employee }) => {
  return (
    <div className="flex flex-col p-3 items-center w-full">
      <div className="flex flex-col gap-y-1 items-center">
        <Avatar
          size={"xl"}
          src={`https://ui-avatars.com/api/?name=${employee?.firstname}+${employee?.lastname}&bold=true`}
        />
        <div className="flex items-center w-full flex-col">
          <p className="text-lg font-semibold ">{employee?.firstname} {employee?.lastname}</p>
          <p className=" opacity-80">{employee?.email}</p>
        </div>
      </div>
      <Divider w={"100%"} my={"md"} />
      <div className="flex w-full flex-col gap-y-3 my-4">
        <h1 className=" font-semibold text-lg">Employee Details</h1>
        <div className="flex flex-col gap-y-2 text-slate-500 w-full">
          <div className="flex items-center gap-x-2">
            <FaEnvelope />
            <p>{employee?.email}</p>
          </div>
          
          <div className="flex items-center gap-x-2">
            <FaPhoneAlt />
            <p>{employee?.telephone}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <FaYandexInternational />
            <p>{employee?.nationalIdentity}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <FcDepartment />
            <p>{employee?.department}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <GiShieldOpposition />
            <p>{employee?.position}</p>
          </div>
        </div>
      </div>

      <Divider w={"100%"} />

      <div className="flex w-full flex-col gap-y-3 mt-5">
        <h1 className=" font-semibold text-lg">Computer Details</h1>
        <div className="flex flex-col gap-y-2 text-slate-500 w-full">
          <div className="flex items-center gap-x-2">
            <FaIndustry />
            <p>{employee?.laptopManufacturer}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <RxBoxModel />
            <p>{employee?.model}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <MdComputer />
            <p>{employee?.serialNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
