import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

import Quest from "./Quest";
import { QuestCardProps } from "./QuestCardProps";

import { palette, themes } from "constants/colors";
import { QUEST_DURATION, QUEST_LORE } from "constants/game";
import { Card } from "library/components/Card";
import { ProgressBarWithLabels } from "library/components/ProgressBar";
import { ButtonText } from "library/components/StyledText";
import { Text, View, ViewProps } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export default function CurrentQuestDetailCard(props: QuestCardProps) {
  const router = useRouter();
  const { quest, style, ...otherProps } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      gap: 15,
      padding: 5,
      flex: 1,
      backgroundColor: palette.transparent,
    },
    inCardHeading: {
      fontFamily: "Header",
      fontSize: 18,
    },
    exerciseList: {
      width: "100%",
    },
    newQuestButton: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      gap: 10,
      padding: 10,
      marginTop: 10,
    },
    pressed: {
      opacity: 0.5,
    },
    progressStats: {
      marginTop: 10,
      gap: 15,
      backgroundColor: palette.transparent,
    },
  });
  const CARD_TITLE = "⚔️ Current Quest";
  return quest ? (
    <Card
      style={style}
      title={CARD_TITLE}
      headerColor={themes[colorScheme].orange}
      {...otherProps}
    >
      <View style={styles.container}>
        <Text style={styles.inCardHeading}>
          {QUEST_LORE[quest.difficulty].name}
        </Text>
        <Text>{QUEST_LORE[quest.difficulty].description}</Text>
        <View style={styles.progressStats}>
          <ProgressBarWithLabels
            title={"Workouts"}
            labelPosition={"stack"}
            max={quest.goalPerWeek}
            curr={quest.progressThisWeek}
            colorFg={themes[colorScheme].green}
            colorBg={themes[colorScheme].gray}
          />
          <Text>
            Week {quest.wholeWeeksSinceStart + 1} of {quest.numWeeks}{" "}
            {quest.progressThisWeek >= quest.goalPerWeek
              ? "🎉 Congratulations on hitting your goal!"
              : "💪 You can do it!"}
          </Text>
        </View>
      </View>
    </Card>
  ) : (
    <Card
      style={style}
      title={CARD_TITLE}
      headerColor={themes[colorScheme].blueLight}
      {...otherProps}
    >
      <View style={styles.container}>
        <Text>There is no ongoing quest.</Text>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? StyleSheet.compose(styles.newQuestButton, styles.pressed)
              : styles.newQuestButton
          }
          onPress={() => router.push("/quest/new")}
        >
          <FontAwesome5
            name="plus"
            size={30}
            color={themes[colorScheme].text}
          />
          <ButtonText>Start a new quest</ButtonText>
        </Pressable>
      </View>
    </Card>
  );
}
