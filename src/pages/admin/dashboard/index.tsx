import StatCard from "@/components/dashboard/StatCard";
import ChartComp from "@/components/dashboard/chart";
import DashboardLayout from "@/layouts/DashboardLayout";
import { User } from "lucide-react";
import React from "react";

const DashboardIndex = () => {
  const { finance, usersInfo, averageValue, orders, clients } = {
    finance: 0,
    usersInfo: 0,
    averageValue: 0,
    orders: [],
    clients: [],
  };

  return (
    <DashboardLayout>
      <div className=" p-3 flex flex-col w-full">
        <div className="md:flex md:px-2  grid xs:grid-cols-2 items-center justify-between rounded-md gap-3">
            <StatCard title="Total Posts" value={finance} />
            <StatCard
              title="Total Users"
              value={usersInfo}
              icon={<User />}
              tColor="text-blue-600"
              bgColor="bg-blue-100"
            />
            <StatCard title="Total Comments" value={averageValue} />
            <StatCard title="Total Likes" value={averageValue} />
        </div>
        <ChartComp />
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndex;
