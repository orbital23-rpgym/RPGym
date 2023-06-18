import { StyleSheet } from "react-native";

import { Text, TextProps } from "./Themed";

/**
 * Custom styled text for use with form input elements.
 */
export function InputLabel(props: TextProps) {
  const { style, ...otherProps } = props;
  return (
    <Text
      {...otherProps}
      style={StyleSheet.flatten([
        { fontFamily: "BodyRegular", fontSize: 16, marginTop: 5 },
        style,
      ])}
    />
  );
}
