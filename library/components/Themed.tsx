/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { themes } from "constants/colorss";

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
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
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

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Screen(props: ViewProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      padding: 25,
      paddingTop: 100,
    },
  });

  const { style, ...otherProps } = props;

  return (
    <View style={[{ ...styles.container }, style]} {...otherProps}>
      {props.children}
    </View>
  );
}
