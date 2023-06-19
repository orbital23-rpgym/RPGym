/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { themes } from "constants/colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof themes.light & keyof typeof themes.dark,
) {
  const theme = useColorScheme() ?? "dark";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return themes[theme][colorName];
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      padding: 25,
      paddingTop: 100,
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
