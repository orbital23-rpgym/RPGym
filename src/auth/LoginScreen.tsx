import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import LoginController from "./LoginController";

import { View } from "library/components/Themed";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Log In" }} />
      <LoginController />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
