import { StyleSheet } from "react-native";

import { Text, TextProps, useThemeColor } from "./Themed";

export type ErrorDisplayProps = {
  error: Error;
} & TextProps;

export function ErrorDisplay(props: ErrorDisplayProps) {
  const { error, style, ...otherProps } = props;
  const styles = StyleSheet.create({
    errorText: {
      color: useThemeColor({}, "red"),
    },
  });

  return (
    <Text style={StyleSheet.flatten([styles.errorText, style])} {...otherProps}>
      {error.message}
    </Text>
  );
}
