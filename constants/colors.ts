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
};

export const branding = {
  orange: "#F3AD5C",
  blue: "#506AAF",
};

// Temporarily set dark mode only as light mode not set up yet
export const themes = {
  light: {
    text: "#fff",
    background: palette.blueGrayDark,
    tint: "#fff",
    tabIconDefault: "#ccc",
    tabBarInactiveColor: palette.blueDark,
    tabBarActiveColor: palette.blueLight,
    cardBackground: palette.blueGrayMedium,
    buttonDefaultBackground: palette.blueGrayMedium,
    buttonDefaultPressed: palette.blueGrayLight,
    shadowColor: "#000",
    ...palette,
  },
  dark: {
    text: "#fff",
    background: palette.blueGrayDark,
    tint: "#fff",
    tabIconDefault: "#ccc",
    tabBarInactiveColor: palette.blueDark,
    tabBarActiveColor: palette.blueLight,
    cardBackground: palette.blueGrayMedium,
    buttonDefaultBackground: palette.blueGrayMedium,
    buttonDefaultPressed: palette.blueGrayLight,
    shadowColor: "#000",
    ...palette,
  },
};
