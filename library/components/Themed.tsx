/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useContext } from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof themes.light & keyof typeof themes.dark,
) {
  const colorScheme = useContext(ColorSchemeContext);
  const colorFromProps = props[colorScheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return themes[colorScheme][colorName];
  }
}

export type TextProps = ThemeProps & DefaultText["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const styles = StyleSheet.create({
    text: {
      color: useThemeColor({ light: lightColor, dark: darkColor }, "text"),
      fontFamily: "BodyRegular",
      fontSize: 16,
    },
  });

  return (
    <DefaultText
      style={StyleSheet.flatten([styles.text, style])}
      {...otherProps}
    />
  );
}

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ViewProps = ThemeProps & DefaultView["props"];

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <DefaultView
      style={StyleSheet.flatten([{ backgroundColor }, style])}
      {...otherProps}
    />
  );
}

export type ScreenProps = { gap?: number } & ViewProps;

export function Screen(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    scroll: {
      flex: 1,
      width: "100%",
    },
    scrollChildren: {
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      gap: props.gap ?? 15,
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 10,
      paddingBottom: 10,
    },
  });

  const { style, ...otherProps } = props;

  return (
    <View style={StyleSheet.flatten([styles.container, style])} {...otherProps}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollChildren}
      >
        {props.children}
      </ScrollView>
    </View>
  );
}
