import { Tabs } from "expo-router";
import { useContext } from "react";
import { StyleSheet } from "react-native";

import QuestDetailCard from "./QuestDetailCard";

import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Screen, Text, View } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useUserContext } from "library/context/UserContext";

export default function QuestsScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useUserContext();
  const quest = user.character.ongoingQuest;
  const styles = StyleSheet.create({});
  const pastQuests = [];
  return (
    <Screen gap={20}>
      <Tabs.Screen
        options={{
          title: "Quests",
        }}
      />
      <QuestDetailCard quest={quest} />
      <HeadingText>Quest History</HeadingText>
      {pastQuests.length > 0 ? (
        <View>
          <Text>placeholder</Text>
        </View>
      ) : (
        <Text>You have not attempted any quests.</Text>
      )}
    </Screen>
  );
}
