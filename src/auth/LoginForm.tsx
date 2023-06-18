import { useState } from "react";
import { StyleSheet } from "react-native";

import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { InputLabel } from "library/components/InputLabel";
import { TextInput } from "library/components/TextInput";
import { Text, View } from "library/components/Themed";

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
      <InputLabel id="email-label">Email:</InputLabel>
      <TextInput
        accessibilityLabelledBy="email-label"
        onChangeText={setEmail}
        autoComplete="email"
        autoCapitalize="none"
        inputMode="email"
      />
      <InputLabel id="pw-label">Password:</InputLabel>
      <TextInput
        accessibilityLabelledBy="pw-label"
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
