import { useAuth } from "@/contexts/AuthProvider";
import DashboardLayout from "@/layouts/DashboardLayout";
import { humanizeDate, humanizeDateFormat } from "@/utils/funcs";
import { Input, InputWrapper } from "@mantine/core";
import React from "react";

const AccountIndex = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="w-full h-full flex p-4 flex-col items-center">
        <div className=" border-mainblue border-2 rounded-full mt-11">
          <img
            className=" rounded-full w-40"
            src={`https://ui-avatars.com/api/?name=${user?.fullName}+${user?.email}&bold=true`}
            alt=""
          />
        </div>
        <div className="flex flex-col w-full items-center mt-5 mx-auto max-w-[800px]">
          <div className="grid w-full gap-6 sm:grid-cols-2">
            <InputWrapper label="Username" description="Username">
              <Input value={user?.username} disabled type={"text"} />
            </InputWrapper>
            <InputWrapper label="Email" description="Email">
              <Input value={user?.email} disabled type={"text"} />
            </InputWrapper>
             <InputWrapper label="Phone Number" description="Phone Number">
              <Input value={user?.telephone} disabled type={"text"} />
            </InputWrapper>
            <InputWrapper label="Full Name" description="Full Name">
              <Input value={user?.fullName} disabled type={"text"} />
            </InputWrapper> 
            <InputWrapper label="Date Of Birth" description="Date Of Birth">
              <Input value={humanizeDateFormat(user?.dateOfBirth || "Something")} disabled type={"text"} />
            </InputWrapper> 
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountIndex;
