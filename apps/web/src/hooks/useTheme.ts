import { Dispatch, SetStateAction, useState } from "react";

export default function useTheme() {
  const [isDarkTheme, setDarkTheme] = useState(false);

  if (typeof window !== "undefined") {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }

  return [isDarkTheme, setDarkTheme] as [boolean, Dispatch<SetStateAction<boolean>>];
}
