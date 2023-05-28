import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { Link } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import PlaceholderText from "../../components/Placeholder";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Link href="/" style={{ padding: 10, fontSize: 20, color: "#fff" }}>
        <PlaceholderText />
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

function SignUpController(email: string, password: string) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
