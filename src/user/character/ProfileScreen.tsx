import { FontAwesome } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import AvatarPic from "./AvatarPic";
import { UserCharacter } from "./UserCharacter";

import { themes } from "constants/colors";
import { MAX_ELEMENT_WIDTH } from "constants/ui";
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
    profileInfoContainer: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 20,
      width: "100%",
      maxWidth: MAX_ELEMENT_WIDTH,
      flexWrap: "wrap",
    },
    avatarContainer: {
      aspectRatio: 1,
      minWidth: 100,
      flex: 2,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    profileDetailsContainer: {
      alignItems: "flex-start",
      justifyContent: "center",
      flexDirection: "column",
      flex: 3,
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
    <Screen gap={20}>
      <Tabs.Screen
        options={{
          title: "Profile",
          headerRight: () => (
            <Link href="/settings/" asChild>
              <Pressable>
                {({ pressed }) => {
                  const style = { marginRight: 15, opacity: pressed ? 0.5 : 1 };
                  return (
                    <FontAwesome
                      name="gear"
                      size={25}
                      color={themes[colorScheme].text}
                      style={style}
                    />
                  );
                }}
              </Pressable>
            </Link>
          ),
        }}
      />
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
