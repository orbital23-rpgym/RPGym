import { Link, useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { Button } from "library/components/Button";
import { Text, useThemeColor, View } from "library/components/Themed";

export default function SettingsScreen() {
  const auth = getAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.replace("(auth)/welcome");
      })
      .catch((error) => {
        // An error happened.
        setErrorMessage(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Button variant="primary">
        <Link href="settings/profileSettings" style={styles.buttonText}>
          Edit profile
        </Link>
      </Button>
      <Text>(app, account settings go here)</Text>

      <Button variant="destructive" onPress={logout}>
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
    color: "#fff",
  },
});
