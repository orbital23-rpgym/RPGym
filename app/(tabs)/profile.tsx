import { StyleSheet } from "react-native";
import {
  Screen,
  Card,
  Text,
  View,
  useThemeColor,
} from "library/components/Themed";
import { useEffect, useState } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useAuthentication } from "library/hooks/useAuthentication";
import { db } from "../..";

export default function ProfileScreen() {
  const styles = StyleSheet.create({
    screenStyle: {
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

  const { user } = useAuthentication();

  const [userData, setUserData] = useState<DocumentData>();

  useEffect(() => {
    async function getUserData() {
      if (user)
        await getDoc(doc(db, "users", user.uid)).then((querySnapshot) => {
          const newData = querySnapshot.data();
          setUserData(newData);
        });
    }
    getUserData();
  }, [userData, user]);

  return userData ? (
    <Screen style={styles.screenStyle}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.avatarContainer}>
          <Text>AVATAR</Text>
        </View>
        <View style={styles.profileDetailsContainer}>
          <Text style={styles.displayNameText}>{userData.displayName}</Text>
          <Text style={styles.text}>Health: {userData.currentHealth}/100</Text>
          <Text style={styles.text}>EXP: {userData.exp}</Text>
          <Text style={styles.text}>Level: X</Text>
        </View>
      </View>
      <Card title="⚔️ Weekly Quest" headerColor={useThemeColor({}, "orange")}>
        <Text>PLACEHOLDER</Text>
      </Card>
      <Card title="💪 Campaign" headerColor={useThemeColor({}, "blue")}>
        <Text>PLACEHOLDER</Text>
      </Card>
    </Screen>
  ) : (
    <Screen style={styles.screenStyle}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.avatarContainer}>
          <Text>AVATAR</Text>
        </View>
        <View style={styles.profileDetailsContainer}>
          <Text style={styles.displayNameText}>Loading...</Text>
          <Text style={styles.text}>Health: ___/100</Text>
          <Text style={styles.text}>EXP: __</Text>
          <Text style={styles.text}>Level: X</Text>
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
