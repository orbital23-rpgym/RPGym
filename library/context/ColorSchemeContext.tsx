import { createContext } from "react";

import { ColorTheme } from "constants/colors";

export const ColorSchemeContext = createContext<ColorTheme>("dark");
