import { useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { QuestCardProps } from "./QuestCardProps";

import { palette, themes } from "constants/colors";
import { Card } from "library/components/Card";
import { ProgressBarWithLabels } from "library/components/ProgressBar";
import { Text, View } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export default function CurrentQuestSummaryCard(props: QuestCardProps) {
  const router = useRouter();
  const { quest, style, ...otherProps } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    innerContainer: {
      backgroundColor: palette.transparent,
      gap: 5,
    },
  });
  const CARD_TITLE = "⚔️ Weekly Goal";
  return (
    <TouchableOpacity
      onPress={() => router.replace("(tabs)/quests")}
      activeOpacity={0.6}
      style={styles.container}
    >
      {quest ? (
        <Card
          style={style}
          title={CARD_TITLE}
          headerColor={themes[colorScheme].orange}
          {...otherProps}
        >
          <View style={styles.innerContainer}>
            <ProgressBarWithLabels
              title={"Workouts"}
              labelPosition={"linear"}
              max={quest.goalPerWeek}
              curr={quest.progressThisWeek}
              colorFg={themes[colorScheme].green}
              colorBg={themes[colorScheme].gray}
            />
            <Text>
              {quest.progressThisWeek >= quest.goalPerWeek
                ? "🎉 Congratulations on hitting your goal!"
                : "🌟 You can do it!"}
            </Text>
          </View>
        </Card>
      ) : (
        <Card
          style={style}
          title={CARD_TITLE}
          headerColor={themes[colorScheme].blueLight}
          {...otherProps}
        >
          <View style={styles.innerContainer}>
            <Text>There is no ongoing quest. Why not start one now?</Text>
          </View>
        </Card>
      )}
    </TouchableOpacity>
  );
}
