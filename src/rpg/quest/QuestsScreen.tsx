import { Tabs } from "expo-router";
import { useContext } from "react";
import { StyleSheet } from "react-native";

import CurrentQuestDetailCard from "./CurrentQuestDetailCard";

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
      <CurrentQuestDetailCard quest={quest} />
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
