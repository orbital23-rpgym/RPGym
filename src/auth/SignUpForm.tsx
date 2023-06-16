import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { Text, View } from "library/components/Themed";

export default function SignUpForm(props: {
  onSubmit: (
    email: string,
    username: string,
    password1: string,
    password2: string,
  ) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (
    email: string,
    username: string,
    password1: string,
    password2: string,
  ) => {
    // Disable submit button
    setIsSubmitting(true);
    // Reset list of errors
    setError(undefined);
    props
      .onSubmit(email, username, password1, password2)
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        autoComplete="username"
        autoCapitalize="none"
      />
      <Text style={styles.inputLabel}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        autoComplete="email"
        autoCapitalize="none"
        inputMode="email"
      />
      <Text style={styles.inputLabel}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword1}
        autoComplete="password-new"
        secureTextEntry
      />
      <Text style={styles.inputLabel}>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword2}
        autoComplete="password-new"
        secureTextEntry
      />
      <Button
        variant="primary"
        onPress={() => submit(email, username, password1, password2)}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Button>

      {error && <ErrorDisplay error={error} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputLabel: {},
  input: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 16,
    fontFamily: "BodyRegular",
    margin: 10,
    padding: 5,
    minWidth: 150,
    marginBottom: 20,
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
