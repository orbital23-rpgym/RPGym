import { StyleSheet } from "react-native";

import { Text, TextProps } from "./Themed";

import { headingTextStyle } from "constants/styles";

export function ButtonText(props: TextProps) {
  const { style, ...otherProps } = props;
  const styles = StyleSheet.create({
    buttonText: {
      fontSize: 20,
      fontFamily: "Header",
    },
  });
  return (
    <Text
      style={StyleSheet.flatten([styles.buttonText, style])}
      {...otherProps}
    />
  );
}

export function HeadingText(props: TextProps) {
  const { style, ...otherProps } = props;
  return (
    <Text
      style={StyleSheet.flatten([headingTextStyle, style])}
      {...otherProps}
    />
  );
}
