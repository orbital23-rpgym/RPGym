import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { ThemeProps, useThemeColor } from "./Themed";

import { themes } from "constants/colors";
import { dropShadow } from "constants/styles";

export type ButtonProps = {
  color?: string;
  pressedColor?: string;
  variant?: "primary" | "secondary" | "save" | "destructive" | "default";
} & ThemeProps &
  PressableProps;

export function Button(props: ButtonProps) {
  const {
    color,
    variant,
    lightColor,
    darkColor,
    style,
    pressedColor,
    disabled: isDisabled,
    ...otherProps
  } = props;

  let variantColor: keyof typeof themes.light & keyof typeof themes.dark;
  switch (variant ?? "default") {
    case "primary":
      variantColor = "orange";
      break;
    case "secondary":
      variantColor = "blueLight";
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
      opacity: isDisabled ? 0.5 : 1,
    },
    pressed: {
      backgroundColor:
        pressedColor ?? useThemeColor({}, "buttonDefaultPressed"),
    },
  });

  let newStyle: (state: PressableStateCallbackType) => ViewStyle;
  if (style) {
    if (typeof style === "function") {
      // Merge with given pressed style
      newStyle = (p: PressableStateCallbackType) =>
        p.pressed
          ? StyleSheet.flatten([styles.button, styles.pressed, style(p)])
          : StyleSheet.flatten([styles.button, style(p)]);
    } else {
      // Merge default with given style; use default pressed style
      newStyle = (p: PressableStateCallbackType) =>
        p.pressed
          ? StyleSheet.flatten([styles.button, style, styles.pressed])
          : StyleSheet.flatten([styles.button, style]);
    }
  } else {
    // Use default style
    newStyle = (p: PressableStateCallbackType) =>
      p.pressed
        ? StyleSheet.flatten([styles.button, styles.pressed])
        : styles.button;
  }

  return <Pressable style={newStyle} disabled={isDisabled} {...otherProps} />;
}
