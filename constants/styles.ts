// import { Insets } from "react-native";
import { ColorTheme, themes } from "./colors";

export const headingTextStyle = {
  fontFamily: "Header",
  fontSize: 25,
};

export const commonHeaderStyle = (colorScheme: ColorTheme) => ({
  headerStyle: {
    headerTintColor: themes[colorScheme].text,
    backgroundColor: themes[colorScheme].background,
  },
  headerTitleStyle: {
    ...headingTextStyle,
  },
  headerTintColor: themes[colorScheme].text,
});

// export const stackHeaderStyle = (colorScheme: ColorTheme) => ({
//   headerStyle: {
//     headerTintColor: themes[colorScheme].text,
//     backgroundColor: themes[colorScheme].background,
//   },
//   headerTitleStyle: {
//     ...headingTextStyle,
//   },
//   headerTintColor: themes[colorScheme].text,
// });

// export const tabNavHeaderStyle = (colorScheme: ColorTheme, insets: Insets) => ({
//   headerTransparent: true,
//   headerLeftContainerStyle: {
//     padding: 5,
//   },
//   headerRightContainerStyle: {
//     padding: 10,
//   },
//   ...commonHeaderStyle(colorScheme),
// });

export const dropShadow = (color: string) => ({
  shadowColor: color,
  shadowOpacity: 0.5,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 1 },
});
