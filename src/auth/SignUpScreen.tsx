import { StyleSheet } from "react-native";

import SignUpController from "./SignUpController";

import { View } from "library/components/Themed";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <SignUpController />
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
