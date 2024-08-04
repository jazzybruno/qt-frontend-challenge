"use client";
import React from 'react';
import { GrowthIcon } from '../icons';

interface Props {
   title: string;
   value: number | string;
   icon?: React.ReactNode;
   bgColor?: string;
   tColor?: string;
}

const StatCard = (props: Props) => {
   return (
      <div className="flex bg-white w-full max-w-[500px] gap-3 p-3">
         <div
            className={`flex items-center ${props.bgColor ?? 'bg-[#0f0]/30'} justify-center rounded-full w-16 h-16 ${
               props.tColor ?? 'text-green-700'
            }`}
         >
            {props.icon ?? <GrowthIcon />}
         </div>
         <div className="flex flex-col">
            <span className=" text-gray-500">{props.title}</span>
            <span className=" text-2xl font-semibold">{props.title === "Avg Value" ? `${props.value} %` : props.value}</span>
            <span className=" text-gray-500 text-sm">250 + Orders</span>
         </div>
      </div>
   );
};

export default StatCard;