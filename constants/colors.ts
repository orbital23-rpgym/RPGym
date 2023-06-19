export const palette = {
  redLight: "#FE7E7E",
  red: "#E54848",
  green: "#60C05E",
  orange: "#FAAB52",
  blueLight: "#7392E7",
  blueDark: "#506AAF",
  gray: "#7A7A7A",
  blueGrayLight: "#9CA6C2",
  blueGrayMedium: "#3A4050",
  blueGrayDark: "#25272B",
  black: "#000",
  white: "#fff",
};

export const branding = {
  orange: "#F3AD5C",
  blue: "#506AAF",
};

// Temporarily set dark mode only as light mode not set up yet
export const themes = {
  light: {
    text: palette.white,
    background: palette.blueGrayDark,
    tint: palette.white,
    tabIconDefault: "#ccc",
    tabBarInactiveColor: palette.blueDark,
    tabBarActiveColor: palette.blueLight,
    cardBackground: palette.blueGrayMedium,
    buttonDefaultBackground: palette.blueGrayMedium,
    buttonDefaultPressed: palette.blueGrayLight,
    shadowColor: palette.black,
    ...palette,
  },
  dark: {
    text: palette.white,
    background: palette.blueGrayDark,
    tint: palette.white,
    tabIconDefault: "#ccc",
    tabBarInactiveColor: palette.blueDark,
    tabBarActiveColor: palette.blueLight,
    cardBackground: palette.blueGrayMedium,
    buttonDefaultBackground: palette.blueGrayMedium,
    buttonDefaultPressed: palette.blueGrayLight,
    shadowColor: palette.black,
    ...palette,
  },
};
