import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Text, Button } from "library/components/Themed";
import { RG_BLUE, RG_ORANGE } from "../../constants/Colors";
import { Link } from "expo-router";

export default function WelcomeScreen() {
  return (
    <LinearGradient
      style={styles.container}
      colors={[RG_BLUE, RG_ORANGE]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.25, 1]}
    >
      <Text style={styles.title}>Welcome to RPGym</Text>
      <Button variant="primary">
        <Link href="/signUp">
          <Text style={styles.buttonText}>Sign up</Text>
        </Link>
      </Button>
      <Button variant="secondary">
        <Link href="/login">
          <Text style={styles.buttonText}>Log in</Text>
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
    fontSize: 30,
    fontFamily: "Header",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Header",
  },
});
