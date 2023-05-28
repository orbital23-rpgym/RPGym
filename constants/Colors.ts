export const RG_ORANGE = "#F3AD5C";
export const RG_BLUE = "#506AAF";

type ThemeColors = {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabBarInactiveColor: string;
  tabBarActiveColor: string;
  cardBackground: string;
  buttonPrimaryBackground: string;
  buttonSecondaryBackground: string;
  buttonDestructiveBackground: string;
  buttonDefaultBackground: string;
  shadowColor: string;
  red: string;
  green: string;
  orange: string;
  blue: string;
};

// Temporarily set dark mode only as light mode not set up yet
const themes: { light: ThemeColors; dark: ThemeColors } = {
  light: {
    text: "#fff",
    background: "#25272A",
    tint: "#fff",
    tabIconDefault: "#ccc",
    tabBarInactiveColor: "#506AAF",
    tabBarActiveColor: "#7F9AE2",
    cardBackground: "#3A4050",
    buttonPrimaryBackground: RG_BLUE,
    buttonSecondaryBackground: RG_ORANGE,
    buttonDestructiveBackground: "#F64F4F",
    buttonDefaultBackground: "",
    shadowColor: "#000",
    red: "#F64F4F",
    green: "#60C05E",
    orange: RG_ORANGE,
    blue: RG_BLUE,
  },
  dark: {
    text: "#fff",
    background: "#25272A",
    tint: "#fff",
    tabIconDefault: "#ccc",
    tabBarInactiveColor: "#506AAF",
    tabBarActiveColor: "#7F9AE2",
    cardBackground: "#3A4050",
    buttonPrimaryBackground: "#7F9AE2",
    buttonSecondaryBackground: RG_ORANGE,
    buttonDestructiveBackground: "#F64F4F",
    buttonDefaultBackground: "#7F9AE2",
    shadowColor: "#000",
    red: "#F64F4F",
    green: "#60C05E",
    orange: RG_ORANGE,
    blue: RG_BLUE,
  },
};

export default themes;
