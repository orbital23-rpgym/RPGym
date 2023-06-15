import { StyleSheet } from "react-native";

import { Text, useThemeColor } from "./Themed";

export function ErrorDisplay(props: { error: Error }) {
  const styles = StyleSheet.create({
    errorText: {
      color: useThemeColor({}, "red"),
    },
  });

  return <Text style={styles.errorText}>{props.error.message}</Text>;
}
