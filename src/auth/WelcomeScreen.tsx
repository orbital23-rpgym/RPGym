import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { branding } from "constants/colors";
import { images } from "constants/images";
import { Button } from "library/components/Button";
import { ButtonText } from "library/components/StyledText";
import { Text } from "library/components/Themed";

export default function WelcomeScreen() {
  return (
    <LinearGradient
      style={styles.container}
      colors={[branding.blue, branding.orange]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.25, 1]}
    >
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 30,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
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
