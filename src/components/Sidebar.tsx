"use client";
import React, { useState } from "react";
import Image from "next/image";
import { calenderIcon, collapseIcon, dashboardsIcon, invoiceIcon, logoBlueIcon, notificationIcon, plusIcon, scheduleIcon, settingIcon, uploadIcon } from "@/constants"; 
import Themebtn from "./Themebtn";
interface SidebarProps {
    isExpanded: boolean;
    isCollapse:boolean;
    toggleCollapse:()=>void;
    toggleSidebar: () => void;
  }

const Sidebar:React.FC<SidebarProps>=({ isExpanded, toggleSidebar,isCollapse,toggleCollapse }) =>{
  
  return (
    <div
    className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-full  transition-transform duration-300 ease-out transform 
      ${isExpanded ? 'translate-x-0  ' : '-translate-x-full'} 
      
      sm:relative sm:translate-x-0 sm:rounded-none sm:min-h-screen  `}
  >
    <div className="flex flex-col justify-between w-full h-full bg-white rounded-r-3xl shadow-xl dark:bg-black sm:rounded-none sm:shadow-none ">
      {/* Top Section */}
      <div>
        {/* Logo and Toggle Button */}
        <div className="flex items-center justify-between py-4 px-4">
          <div className="flex items-center justify-center gap-x-4">
            <Image src={logoBlueIcon} alt="Logo" className="sm:w-10 sm:h-10" />
            {!isCollapse&&<p className="font-semibold text-xl text-black dark:text-white font-nunito">Base</p>}
          </div>
          <button onClick={toggleSidebar} className="sm:hidden p-2">
            <Image src={plusIcon} alt="Toggle Icon" />
          </button>
          <button onClick={toggleCollapse} className="hidden sm:block p-2 duration-300 ease-out">
            <Image src={collapseIcon} alt="Toggle Icon" width={28} height={28} />
          </button>
        </div>
        {/* Menu Items */}
        <nav className="mt-4 ">
          <ul>
            <li className="flex items-center py-4 px-8 text-gray-700 hover:bg-gray-200">
              <span className="flex items-center">
                <Image src={dashboardsIcon} alt="dashboards" />
                {!isCollapse&&<span className="ml-4 text-gray-500 font-nunito">Dashboard</span>}
              </span>
            </li>
            <li
            onClick={toggleSidebar}
              className="flex items-center py-4 px-8 text-gray-700  sm:cursor-default sm:dark:linear-bg sm:linear-bg-dark">
              <span className="flex items-center ">
                <Image src={uploadIcon} alt="upload" className="w-6 h-6" />
                {!isCollapse&&<span className="ml-3 text-[#605BFF] font-nunito">Upload</span>}
              </span>
            </li>
            <li className="flex items-center py-4 px-8 text-gray-700 hover:bg-gray-200">
              <span className="flex items-center">
                <Image src={invoiceIcon} alt="invoice" />
                {!isCollapse&&<span className="ml-4 text-gray-500 font-nunito">Invoice</span>}
              </span>
            </li>
            <li className="flex items-center py-4 px-8 text-gray-700 hover:bg-gray-200">
              <span className="flex items-center">
                <Image src={scheduleIcon} alt="Schedule" />
                {!isCollapse&&<span className="ml-4 text-gray-500 font-nunito">Schedule</span>}
              </span>
            </li>
            <li className="flex items-center py-4 px-8 text-gray-700 hover:bg-gray-200">
              <span className="flex items-center">
                <Image src={calenderIcon} alt="calender" />
                {!isCollapse&&<span className="ml-4 text-gray-500 font-nunito">Calendar</span>}
              </span>
            </li>
            <li className="flex items-center py-4 px-8 text-gray-700 hover:bg-gray-200">
              <span className="flex items-center">
                <Image src={notificationIcon} alt="notification" />
                {!isCollapse&&<span className="ml-4 text-gray-500 font-nunito">Notification</span>}
              </span>
            </li>
            <li className="flex items-center py-4 px-8 text-gray-700 hover:bg-gray-200">
              <span className="flex items-center ">
                <Image src={settingIcon} alt="setting" />
                {!isCollapse&&<span className="ml-4 text-gray-500 font-nunito">Setting</span>}
              </span>
            </li>
          </ul>
        </nav>
      </div>
      {/* Bottom Section */}
      <div className="hidden sm:block ml-8 mb-8">
        <Themebtn />
      </div>
    </div>
  </div>
  );
}

export default Sidebar;
