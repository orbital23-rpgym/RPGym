import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import PlaceholderText from "library/components/Placeholder";
import { Screen } from "library/components/Themed";

export default function ProfileSettingsScreen() {
  return (
    <Screen>
      <Stack.Screen options={{ title: "Profile Settings" }} />
      <PlaceholderText />
    </Screen>
  );
}
