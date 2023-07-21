import { Stack } from "expo-router";
import { Text } from "react-native";

/**
 * Temporary placeholder/loading screen using no external fonts.
 *
 * Supposed to load in lieu of default screen while fonts are loading/splash screen is visible,
 * but doesn't seem to work regardless :/
 */
export default function TempLoadingScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitleStyle: {
            fontFamily: "System",
          },
        }}
      />
      <Text>loading...</Text>
    </>
  );
}
