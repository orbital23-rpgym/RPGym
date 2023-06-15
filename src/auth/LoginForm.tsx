import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { ErrorDisplay } from "library/components/ErrorDisplay";
import { Button, Text, View } from "library/components/Themed";

export default function LoginForm(props: {
  onSubmit: (email: string, password: string) => Promise<void>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (email: string, password: string) => {
    // Disable submit button
    setIsSubmitting(true);
    // Reset list of errors
    setError(undefined);
    props
      .onSubmit(email, password)
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <View style={styles.container}>
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
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />
      <Button
        variant="primary"
        onPress={() => submit(email, password)}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>Log In</Text>
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
