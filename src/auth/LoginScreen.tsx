import { Stack } from "expo-router";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

import LoginController from "./LoginController";

import { Screen } from "library/components/Themed";

export default function LoginScreen() {
  return (
    <Screen>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Stack.Screen options={{ title: "Log In" }} />
        <LoginController />
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
