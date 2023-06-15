import { StyleSheet } from "react-native";

import { View } from "library/components/Themed";
import LoginController from "./LoginController";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
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
