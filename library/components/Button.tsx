import { useContext } from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";

import { ThemeProps, useThemeColor } from "./Themed";

import { themes } from "constants/colors";
import { dropShadow } from "constants/styles";

export type ButtonProps = {
  color?: string;
  variant?: "primary" | "secondary" | "save" | "destructive" | "default";
} & ThemeProps &
  PressableProps;

export function Button(props: ButtonProps) {
  const { color, variant, lightColor, darkColor, ...otherProps } = props;

  let variantColor: keyof typeof themes.light & keyof typeof themes.dark;
  switch (variant ?? "default") {
    case "primary":
      variantColor = "blueLight";
      break;
    case "secondary":
      variantColor = "orange";
      break;

    case "save":
      variantColor = "green";
      break;

    case "destructive":
      variantColor = "red";
      break;

    default:
      variantColor = "buttonDefaultBackground";
      break;
  }

  const styles = StyleSheet.create({
    button: {
      borderRadius: 10,
      padding: 15,
      margin: 10,
      ...dropShadow(useThemeColor({}, "shadowColor")),
      backgroundColor:
        color ??
        useThemeColor({ light: lightColor, dark: darkColor }, variantColor),
    },
  });

  return <Pressable style={styles.button} {...otherProps} />;
}
