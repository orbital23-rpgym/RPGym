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

export type ScreenProps = { gap?: number } & ViewProps;

export function Screen(props: ScreenProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scroll: {
      flex: 1,
      width: "100%",
      padding: 25,
      paddingTop: 100,
    },
    scrollChildren: {
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      gap: props.gap ?? 15,
    },
  });

  const { style, ...otherProps } = props;

  return (
    <View style={[{ ...styles.container }, style]} {...otherProps}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollChildren}
      >
        {props.children}
      </ScrollView>
    </View>
  );
}
