import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { images } from "constants/images";
import { Button } from "library/components/Button";
import { GradientBackgroundScreen } from "library/components/GradientBackground";
import { ButtonText } from "library/components/StyledText";
import { Text } from "library/components/Themed";

export default function WelcomeScreen() {
  return (
    <GradientBackgroundScreen>
      <Image
        source={images.logo.white}
        accessibilityLabel="RPGym Logo"
        style={styles.logo}
        contentFit="contain"
      />
      <Text style={styles.title}>Welcome to RPGym</Text>
      <Button variant="secondary">
        <Link href="/signUp">
          <ButtonText>Sign up</ButtonText>
        </Link>
      </Button>
      <Button variant="primary">
        <Link href="/login">
          <ButtonText>Log in</ButtonText>
        </Link>
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
