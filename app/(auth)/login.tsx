import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { Link } from "expo-router";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>LOG IN</Text>
      <Link href="/" style={{ padding: 10, fontSize: 20, color: "#fff" }}>
        [click to log in]
      </Link>
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
