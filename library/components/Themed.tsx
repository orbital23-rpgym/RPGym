/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";

import Colors from "constants/Colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "dark";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

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
      padding: 30,
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

type CardProps = {
  title?: string;
  headerColor?: string;
} & DefaultView["props"];

export function Card(props: CardProps) {
  const styles = StyleSheet.create({
    cardContainer: {
      margin: 10,
      borderRadius: 10,
      backgroundColor: useThemeColor({}, "cardBackground"),
      shadowColor: useThemeColor({}, "shadowColor"),
      shadowOpacity: 0.5,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      overflow: "hidden",
      height: "auto",
      minWidth: 100,
    },
    titleText: {
      fontFamily: "Header",
      fontSize: 20,
    },
    titleBar: {
      backgroundColor: props.headerColor ?? useThemeColor({}, "blue"),
      top: 0,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      height: "auto",
    },
    childContainer: {
      padding: 20,
      height: "auto",
    },
  });

  const headerBar = props.title ? (
    <DefaultView style={styles.titleBar}>
      <Text style={styles.titleText}>{props.title}</Text>
    </DefaultView>
  ) : (
    <></>
  );
  return (
    <>
      <DefaultView style={styles.cardContainer}>
        {headerBar}
        <DefaultView style={styles.childContainer}>
          {props.children}
        </DefaultView>
      </DefaultView>
    </>
  );
}

export type ButtonProps = {
  variant?: "primary" | "secondary" | "destructive";
} & ThemeProps &
  PressableProps;

export function Button(props: ButtonProps) {
  const { lightColor, darkColor, ...otherProps } = props;
  let backgroundColor;
  switch (props.variant) {
    case "primary":
      backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "buttonPrimaryBackground",
      );
      break;
    case "secondary":
      backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "buttonSecondaryBackground",
      );
      break;
    case "destructive":
      backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "buttonDestructiveBackground",
      );
      break;
    default:
      backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "buttonDefaultBackground",
      );
  }

  const styles = StyleSheet.create({
    button: {
      borderRadius: 10,
      padding: 20,
      margin: 10,
      shadowColor: useThemeColor({}, "shadowColor"),
      shadowOpacity: 0.5,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
    },
  });

  return (
    <Pressable style={[{ backgroundColor }, styles.button]} {...otherProps} />
  );
}
