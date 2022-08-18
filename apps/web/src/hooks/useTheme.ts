import { Dispatch, SetStateAction, useState } from "react";

export default function useTheme() {
  const [isDarkTheme, setDarkTheme] = useState<boolean>(false);

  if (typeof window !== "undefined") {
    const body = document.querySelector("body")!;

    if (isDarkTheme) body.classList.add("dark");
    else body.classList.remove("dark");
  }

  return [isDarkTheme, setDarkTheme] as [boolean, Dispatch<SetStateAction<boolean>>];
}
