import { Stack } from "expo-router";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

import LoginController from "./LoginController";

import { View } from "library/components/Themed";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Stack.Screen options={{ title: "Log In" }} />
        <LoginController />
      </KeyboardAvoidingView>
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
