import { Stack } from "expo-router";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

import SignUpController from "./SignUpController";

import { Screen } from "library/components/Themed";

export default function SignUpScreen() {
  return (
    <Screen>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Stack.Screen options={{ title: "Sign Up" }} />
        <SignUpController />
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
