import { useState } from "react";
import { StyleSheet } from "react-native";

import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { InputLabel } from "library/components/InputLabel";
import { ButtonText } from "library/components/StyledText";
import { TextInput } from "library/components/TextInput";
import { View } from "library/components/Themed";

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
      <InputLabel id="name-label">Username:</InputLabel>
      <TextInput
        accessibilityLabelledBy="name-label"
        onChangeText={setUsername}
        autoComplete="username"
        autoCapitalize="none"
      />
      <InputLabel id="email-label">Email:</InputLabel>
      <TextInput
        accessibilityLabelledBy="email-label"
        onChangeText={setEmail}
        autoComplete="email"
        autoCapitalize="none"
        inputMode="email"
      />
      <InputLabel id="pw1-label">Password:</InputLabel>
      <TextInput
        accessibilityLabelledBy="pw1-label"
        onChangeText={setPassword1}
        autoComplete="password-new"
        secureTextEntry
      />
      <InputLabel id="pw2-label">Confirm Password:</InputLabel>
      <TextInput
        accessibilityLabelledBy="pw2-label"
        onChangeText={setPassword2}
        autoComplete="password-new"
        secureTextEntry
      />
      <Button
        variant="primary"
        onPress={() => submit(email, username, password1, password2)}
        disabled={isSubmitting}
      >
        <ButtonText>Sign Up</ButtonText>
      </Button>

      {error && <ErrorDisplay error={error} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
