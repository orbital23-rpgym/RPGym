import { Tabs } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import CurrentQuestDetailCard from "./CurrentQuestDetailCard";

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
  });

  const pastQuests = [];
  return (
    <Screen gap={20}>
      <Tabs.Screen
        options={{
          title: "Quests",
        }}
      />
      <CurrentQuestDetailCard quest={user.character.ongoingQuest} />
      <HeadingText style={styles.heading}>Quest History</HeadingText>
      {pastQuests.length > 0 ? (
        <View>
          <Text>placeholder</Text>
        </View>
      ) : (
        <Text>You have not attempted any quests yet.</Text>
      )}
    </Screen>
  );
}
