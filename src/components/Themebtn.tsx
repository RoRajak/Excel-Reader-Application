"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  moonDarkIcon,
  moonWhiteIcon,
  sunGrayIcon,
  sunWhiteIcon,
} from "@/constants";

interface ThemeProp{
  value?:string;
}

const Themebtn: React.FC<ThemeProp> = ({value}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === "dark";



  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-out  ${
        isDarkMode ? "bg-gray-700" : "bg-gray-300"
      }`}
      style={{ bottom: value }}
      aria-label="Toggle theme"
    >
      <div className="relative flex items-center justify-between">
        {/* Toggle Button Circle */}
        <div
          className={`absolute w-6 h-6 rounded-full -top-1 transition-transform duration-300 ease-in-out flex items-center justify-center ${
            isDarkMode ? "translate-x-8 bg-black" : "translate-x-0 bg-white"
          }`}
        >
          {isDarkMode ? (
            <Image src={moonDarkIcon} alt="moon" width={14} height={14} />
          ) : (
            <Image src={sunWhiteIcon} alt="sun" width={18} height={18} />
          )}
        </div>

        {/* Sun/Moon Icons */}
        <div
          className={`flex items-center justify-between w-full px-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-700 ml-6"
          }`}
        >
          {isDarkMode ? (
            <Image src={sunGrayIcon} alt="sun" width={18} height={18} />
          ) : (
            <Image src={moonWhiteIcon} alt="moon" width={18} height={18} />
          )}
        </div>
      </div>
    </button>
  );
};

export default Themebtn;
