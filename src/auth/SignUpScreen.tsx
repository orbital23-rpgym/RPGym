import { StyleSheet } from "react-native";
import { Text, View } from "library/components/Themed";
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 16,
    fontFamily: "BodyRegular",
    margin: 10,
    padding: 5,
    minWidth: 150,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Header",
  },
  disclaimer: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
});
