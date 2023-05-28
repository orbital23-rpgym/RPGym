import { Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View, Button, useThemeColor } from "../../components/Themed";
import { Link } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter, useSegments } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();
  const router = useRouter();

  function signIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.replace("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={{ color: useThemeColor({}, "red") }}>{errorMessage}</Text>
      <Button variant="primary" onPress={() => signIn(email, password)}>
        <Text style={styles.buttonText}>Log In</Text>
      </Button>
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
});
