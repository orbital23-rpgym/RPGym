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

export type ScreenProps = {
  gap?: number;
  noScroll?: boolean;
  noTabBar?: boolean;
} & ViewProps;

export function Screen(props: ScreenProps) {
  const {
    gap,
    noScroll: isNotScrollable = false,
    noTabBar: shouldHaveBottomPadding = false,
    style,
    children,
    ...otherProps
  } = props;
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: shouldHaveBottomPadding ? insets.bottom : 0,
      minHeight: 500,
    },
    scroll: {
      flex: 1,
      width: "100%",
    },
    scrollChildren: {
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      gap: gap ?? 15,
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 10,
      paddingBottom: 10,
    },
    noScroll: {
      flex: 1,
      paddingLeft: insets.left + 25,
      paddingRight: insets.right + 25,
      paddingBottom: shouldHaveBottomPadding ? insets.bottom + 20 : 10,
      paddingTop: 10,
      minHeight: 500,
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      gap: gap ?? 15,
      width: "100%",
    },
  });

  return isNotScrollable ? (
    <View style={StyleSheet.compose(styles.noScroll, style)}>{children}</View>
  ) : (
    <View style={StyleSheet.compose(styles.container, style)} {...otherProps}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollChildren}
      >
        {children}
      </ScrollView>
    </View>
  );
}
