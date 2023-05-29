import { StyleSheet, TextInput } from "react-native";

import { Button, Text, View, useThemeColor } from "../../components/Themed";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();
  const router = useRouter();

  function preSignUp() {
    if (password1 !== password2) {
      setErrorMessage("Passwords do not match");
    } else {
      signUp(email, password1);
    }
  }

  function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        router.replace("(tabs)/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
        setErrorMessage(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.disclaimer}>
        NOTE: As this is a proof-of-concept, all created accounts will be
        deleted later.
      </Text>

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        autoComplete="email"
        autoCapitalize="none"
        inputMode="email"
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword1}
        autoComplete="password-new"
        secureTextEntry
      />
      <Text>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword2}
        autoComplete="password-new"
        secureTextEntry
      />

      <Text style={{ color: useThemeColor({}, "red") }}>{errorMessage}</Text>
      <Button variant="primary" onPress={preSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  disclaimer: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  }
});
