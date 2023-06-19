import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import AvatarPic from "./AvatarPic";
import { UserCharacter } from "./UserCharacter";

import { themes } from "constants/colors";
import { Card } from "library/components/Card";
import LoadingScreen from "library/components/LoadingScreen";
import { ProgressBarWithLabels } from "library/components/ProgressBar";
import { Screen, Text, useThemeColor, View } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { UserContext } from "library/context/UserContext";
import { useAuthentication } from "library/hooks/useAuthentication";
import { db } from "src/firebase-init";

export default function ProfileScreen() {
  const styles = StyleSheet.create({
    screenStyle: {
      gap: 10,
    },
    profileInfoContainer: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 20,
      margin: 10,
      flexWrap: "wrap",
    },
    avatarContainer: {
      width: 120,
      height: 120,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    profileDetailsContainer: {
      alignItems: "flex-start",
      justifyContent: "center",
      flexDirection: "column",
      flex: 1,
      gap: 5,
      minWidth: 140,
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

  const user = useContext(UserContext);
  const colorScheme = useContext(ColorSchemeContext);

  const [character, setCharacter] = useState<UserCharacter | undefined>(
    user?.character,
  );

  useEffect(() => {
    // console.log(user);
    // if (user !== undefined) setCharacter(user.character);
  }, []);

  return character !== undefined ? (
    <Screen style={styles.screenStyle}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.avatarContainer}>
          <AvatarPic avatar={character.avatar} />
        </View>
        <View style={styles.profileDetailsContainer}>
          <Text style={styles.displayNameText}>{character.displayName}</Text>
          <Text style={styles.text}>Level: X</Text>
          <ProgressBarWithLabels
            title="Health"
            labelPosition="stack"
            max={character.maxHealth}
            colorFg={themes[colorScheme].red}
            curr={character.currentHealth}
          />
          <ProgressBarWithLabels
            title="Experience"
            labelPosition="stack"
            max={100}
            colorFg={themes[colorScheme].blueLight}
            curr={character.exp}
          />
        </View>
      </View>
      <Card title="⚔️ Weekly Quest" headerColor={themes[colorScheme].orange}>
        <Text>PLACEHOLDER</Text>
      </Card>
      <Card title="💪 Campaign" headerColor={themes[colorScheme].blueLight}>
        <Text>PLACEHOLDER</Text>
        <ProgressBarWithLabels
          title="test2"
          labelPosition="linear"
          max={200}
          curr={66}
          colorFg={themes[colorScheme].green}
          colorBg={themes[colorScheme].gray}
        />
      </Card>
    </Screen>
  ) : (
    <LoadingScreen />
  );
}
