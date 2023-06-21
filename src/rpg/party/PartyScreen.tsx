import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import PlaceholderText from "library/components/Placeholder";
import { Screen } from "library/components/Themed";

export default function PartyScreen() {
  return (
    <Screen>
      <Tabs.Screen
        options={{
          title: "Party",
        }}
      />
      <PlaceholderText />
    </Screen>
  );
}
