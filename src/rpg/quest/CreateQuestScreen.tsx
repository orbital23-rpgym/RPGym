import { Stack } from "expo-router";
import { useContext } from "react";
import { StyleSheet } from "react-native";

import CreateQuestController from "./CreateQuestController";

import { themes } from "constants/colors";
import { Screen, View } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export default function CreateQuestScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
  });
  return (
    <Screen>
      <Stack.Screen
        options={{
          title: "New Quest",
        }}
      />
      <View style={styles.container}>
        <CreateQuestController />
      </View>
    </Screen>
  );
}
