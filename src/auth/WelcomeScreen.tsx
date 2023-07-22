import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import { images } from "constants/images";
import { Button } from "library/components/Button";
import { GradientBackgroundScreen } from "library/components/GradientBackground";
import { ButtonText } from "library/components/StyledText";
import { Text } from "library/components/Themed";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <GradientBackgroundScreen>
      <Image
        source={images.logo.white}
        accessibilityLabel="RPGym Logo"
        style={styles.logo}
        contentFit="contain"
      />
      <Text style={styles.title}>Welcome to RPGym</Text>
      <Button variant="secondary" onPress={() => router.push("/signUp")}>
        <ButtonText>Sign up</ButtonText>
      </Button>
      <Button variant="primary" onPress={() => router.push("/login")}>
        <ButtonText>Log in</ButtonText>
      </Button>
    </GradientBackgroundScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontFamily: "Header",
    marginBottom: 10,
    textAlign: "center",
  },
  logo: {
    flex: 1,
    maxWidth: 250,
    maxHeight: 250,
    width: "100%",
  },
});
