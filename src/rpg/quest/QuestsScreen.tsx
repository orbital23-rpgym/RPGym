import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import AvatarRenderer from "../avatar/AvatarRenderer";

import CurrentQuestDetailCard from "./CurrentQuestDetailCard";
import Quest from "./Quest";

import { ONBOARDING_IMAGES } from "constants/onboarding";
import { HeadingText } from "library/components/StyledText";
import { Screen, Text, View } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useAppUser } from "library/context/UserContext";

export default function QuestsScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useAppUser();
  const styles = StyleSheet.create({
    heading: {
      marginTop: 10,
    },
    bestiesContainer: {
      flex: 1,
      width: "100%",
      minHeight: 200,
      flexDirection: "row",
    },
    jimbro: {
      flex: 1,
      marginVertical: 15,
    },
    avatar: {
      flex: 1,
    },
  });

  const [pastQuests, setPastQuests] = useState<Quest[]>([]);
  useEffect(() => {
    user.character.getPastQuests().then((quests) => setPastQuests(quests));
  }, [user]);

  return (
    <Screen gap={20}>
      <Tabs.Screen
        options={{
          title: "Quests",
        }}
      />
      <CurrentQuestDetailCard quest={user.character.ongoingQuest} />
      <View style={styles.bestiesContainer}>
        <Image
          style={styles.jimbro}
          source={ONBOARDING_IMAGES.jimbro.swordRight}
          contentFit="contain"
        />
        <View style={styles.avatar}>
          <AvatarRenderer transparentBg avatar={user.character.avatar} />
        </View>
      </View>
      {/* <HeadingText style={styles.heading}>Quest History</HeadingText>
      {pastQuests.length > 0 ? (
        <View>
          <Text>placeholder</Text>
        </View>
      ) : (
        <Text>You have not attempted any quests yet.</Text>
      )} */}
    </Screen>
  );
}
