import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Link, Tabs, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import AvatarRenderer from "../../rpg/avatar/AvatarRenderer";

import { themes } from "constants/colors";
import { fullWidthButton } from "constants/styles";
import { MAX_ELEMENT_WIDTH } from "constants/ui";
import { Button } from "library/components/Button";
import { ProgressBarWithLabels } from "library/components/ProgressBar";
import { ButtonText } from "library/components/StyledText";
import { Screen, Text, View } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useAppUser, useSetAppUser } from "library/context/UserContext";
import CurrentQuestSummaryCard from "src/rpg/quest/CurrentQuestSummaryCard";
import EquippedItemsCard from "src/user/character/equip/EquippedItemsCard";

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
    levelCoinsContainer: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      alignContent: "center",
      gap: 10,
      justifyContent: "space-between",
      marginTop: 5,
    },
    levelCoinsContainerInner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    levelCoinsText: {
      fontFamily: "Header",
      fontSize: 16,
    },
  });

  const user = useAppUser();
  const setUser = useSetAppUser();
  const colorScheme = useContext(ColorSchemeContext);
  const character = user.character;
  const router = useRouter();

  useEffect(() => {
    // refresh user character data
    user.character.getUserCharacter().then((value) => {
      user.setUserCharacter(value).then((value) => {
        setUser(value);
      });
    });
  }, []);

  return (
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
          <AvatarRenderer avatar={character.avatar} />
        </View>
        <View style={styles.profileDetailsContainer}>
          <Text style={styles.displayNameText}>{character.displayName}</Text>
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
            max={character.expForNextLevel}
            colorFg={themes[colorScheme].blueLight}
            curr={character.expForLevel}
          />
          <View style={styles.levelCoinsContainer}>
            <View style={styles.levelCoinsContainerInner}>
              <FontAwesome
                name="star"
                size={15}
                color={themes[colorScheme].blueLight}
              />
              <Text style={styles.levelCoinsText}>
                Level {character.expLevel}
              </Text>
            </View>

            <View style={styles.levelCoinsContainerInner}>
              <FontAwesome5
                name="coins"
                size={15}
                color={themes[colorScheme].orange}
              />
              <Text style={styles.levelCoinsText}>
                {character.money.toFixed(0)} coins
              </Text>
            </View>
          </View>
        </View>
      </View>
      <CurrentQuestSummaryCard quest={character.ongoingQuest} />
      <EquippedItemsCard />
      <Button
        style={fullWidthButton.button}
        variant="secondary"
        onPress={() => router.push("/equipment/shop")}
      >
        <ButtonText style={fullWidthButton.text}>Go to Rewards Shop</ButtonText>
      </Button>
      {/* <Card title="💪 Campaign" headerColor={themes[colorScheme].blueLight}>
        <Text>PLACEHOLDER</Text>
        <ProgressBarWithLabels
          title="test2"
          labelPosition="linear"
          max={200}
          curr={66}
          colorFg={themes[colorScheme].green}
          colorBg={themes[colorScheme].gray}
        />
      </Card> */}
    </Screen>
  );
}
