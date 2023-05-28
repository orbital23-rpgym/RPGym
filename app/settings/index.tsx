import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { Link } from "expo-router";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Link
        href="settings/profileSettings"
        style={{ padding: 10, fontSize: 20, color: "#fff" }}
      >
        [click to edit profile]
      </Link>
      <Text>(app, account settings go here)</Text>
      <Link
        href="/welcome"
        style={{ padding: 10, fontSize: 20, color: "#fff" }}
      >
        [click to log out]
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
