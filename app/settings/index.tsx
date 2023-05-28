import { StyleSheet } from "react-native";

import { Button, Text, View, useThemeColor } from "../../components/Themed";
import { Link } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SettingsScreen() {
  const auth = getAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.replace("/");
      })
      .catch((error) => {
        // An error happened.
        setErrorMessage(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Link
        href="settings/profileSettings"
        style={{ padding: 10, fontSize: 20, color: "#fff" }}
      >
        [click to edit profile]
      </Link>
      <Text>(app, account settings go here)</Text>

      <Button variant="primary" onPress={logout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Button>

      <Text style={{ color: useThemeColor({}, "red") }}>{errorMessage}</Text>
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
  buttonText: {
    fontSize: 20,
    fontFamily: "Header",
  },
});
