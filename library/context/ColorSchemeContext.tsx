import { createContext } from "react";

export const ColorSchemeContext = createContext<"light" | "dark">("dark");
