import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { Text, View } from "library/components/Themed";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Text>workout details go here</Text>
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
});
