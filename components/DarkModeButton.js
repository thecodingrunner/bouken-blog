"use client"

import useTheme from "@/utils/useTheme";
import { useEffect, useState } from "react";
import { CiSun } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

const DarkModeButton = () => {
    const { theme, setTheme } = useTheme();

  return (
    <button 
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
          console.log(theme);
        }}
        className="fixed left-3 bottom-3 rounded-full bg-light-highlight text-white dark:bg-dark-highlight p-3 text-5xl shadow-lg z-60"
    >
        {theme === "dark" ? <FaSun /> : <FaRegMoon />}
    </button>
  )
}

export default DarkModeButton