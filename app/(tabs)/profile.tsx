import { StyleSheet } from "react-native";
import { Screen, Card, Text, View } from "../../components/Themed";
import { useThemeColor } from "../../components/Themed";

export default function ProfileScreen() {
  const styles = StyleSheet.create({
    screenStyle: {
      padding: 30,
      paddingTop: 100,
      gap: 10,
    },
    profileInfoContainer: {
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "row",
      gap: 20,
      margin: 10,
    },
    avatarContainer: {
      width: 120,
      height: 120,
      backgroundColor: useThemeColor({}, "green"),
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    profileDetailsContainer: {
      alignItems: "flex-start",
      justifyContent: "center",
      flexDirection: "column",
      flex: 1,
      gap: 3,
    },
    displayNameText: {
      fontFamily: "Header",
      fontSize: 25,
    },
    text: {
      fontFamily: "BodyRegular",
      fontSize: 16,
    },
  });

  return (
    <Screen style={styles.screenStyle}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.avatarContainer}>
          <Text>AVATAR</Text>
        </View>
        <View style={styles.profileDetailsContainer}>
          <Text style={styles.displayNameText}>Jim Bro</Text>
          <Text style={styles.text}>Health: X</Text>
          <Text style={styles.text}>EXP: Y</Text>
          <Text style={styles.text}>Level: Z</Text>
        </View>
      </View>
      <Card title="⚔️ Weekly Quest" headerColor={useThemeColor({}, "orange")}>
        <Text>PLACEHOLDER</Text>
      </Card>
      <Card title="💪 Campaign" headerColor={useThemeColor({}, "blue")}>
        <Text>PLACEHOLDER</Text>
      </Card>
    </Screen>
  );
}
