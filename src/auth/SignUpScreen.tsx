import { StyleSheet } from "react-native";
import { View } from "library/components/Themed";
import SignUpController from "./SignUpController";

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
