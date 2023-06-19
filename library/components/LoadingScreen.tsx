import { ActivityIndicator, StyleSheet } from "react-native";

import { Screen, Text, useThemeColor } from "library/components/Themed";

export default function LoadingScreen() {
  const styles = StyleSheet.create({
    screenStyle: {
      gap: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontFamily: "Header",
      fontSize: 16,
    },
  });

  return (
    <Screen style={styles.screenStyle}>
      <ActivityIndicator size="large" color={useThemeColor({}, "text")} />
      <Text style={styles.text}>Loading...</Text>
    </Screen>
  );
}
