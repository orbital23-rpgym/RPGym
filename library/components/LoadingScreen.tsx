import { Stack } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";

import { Screen, Text, useThemeColor } from "library/components/Themed";

/**
 * Placeholder/loading screen using no external fonts.
 *
 * Supposed to load in lieu of default screen while fonts are loading/splash screen is visible,
 * but doesn't seem to work regardless :/
 */
export default function LoadingScreen() {
  const styles = StyleSheet.create({
    screenStyle: {
      gap: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: useThemeColor({}, "background"),
    },
    text: {
      fontFamily: "System",
      fontSize: 16,
    },
  });

  return (
    <Screen style={styles.screenStyle}>
      <Stack.Screen
        options={{
          headerTitleStyle: {
            fontFamily: "System",
          },
          headerTitle: "",
        }}
      />
      <ActivityIndicator size="large" color={useThemeColor({}, "text")} />
      <Text style={styles.text}>Loading...</Text>
    </Screen>
  );
}
