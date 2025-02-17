"use client"

import useTheme from "@/utils/useTheme";
import { useEffect, useState } from "react";

const DarkModeButton = () => {
    const { theme, setTheme } = useTheme();

  return (
    <button 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed left-2 bottom-2 rounded-full bg-red-600 text-white dark:bg-black p-2"
    >
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  )
}

export default DarkModeButton