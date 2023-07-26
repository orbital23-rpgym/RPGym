import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";

import { QuestCardProps } from "./QuestCardProps";

import { palette, themes } from "constants/colors";
import { fullWidthButton } from "constants/styles";
import { AddNewLink } from "library/components/AddNewLink";
import { Button } from "library/components/Button";
import { Card } from "library/components/Card";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { ProgressBarWithLabels } from "library/components/ProgressBar";
import { ButtonText } from "library/components/StyledText";
import { Text, View } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { PopUpContext } from "library/context/PopUpContext";
import { useAppUser, useSetAppUser } from "library/context/UserContext";

export default function CurrentQuestDetailCard(props: QuestCardProps) {
  const { quest, style, ...otherProps } = props;
  const popUpData = useContext(PopUpContext);
  const router = useRouter();
  const user = useAppUser();
  const setUser = useSetAppUser();
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
    progressStats: {
      marginTop: 10,
      gap: 15,
      backgroundColor: palette.transparent,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  function claimReward() {
    setIsSubmitting(true);
    setError(undefined);
    user.character
      .completeQuest()
      .then((rewardData) => {
        if (popUpData.setData) {
          popUpData.setData({ href: "/quest/reward", data: rewardData });
        }
        setUser(user);
      })
      .catch((reason) => setError(reason))
      .then(() => setIsSubmitting(false));
  }

  const CARD_TITLE = "⚔️ Current Quest";

  return quest ? (
    <Card
      style={style}
      title={CARD_TITLE}
      headerColor={themes[colorScheme].orange}
      {...otherProps}
    >
      <View style={styles.container}>
        <Text style={styles.inCardHeading}>{quest.name}</Text>
        <Text>{quest.description}</Text>
        <View style={styles.progressStats}>
          {quest.ongoing ? (
            <>
              <ProgressBarWithLabels
                title={"Workouts this week"}
                labelPosition={"stack"}
                max={quest.goalPerWeek}
                curr={quest.progressThisWeek}
                colorFg={themes[colorScheme].green}
                colorBg={themes[colorScheme].gray}
              />
              <Text>
                {`Week ${quest.wholeWeeksSinceStart + 1} of ${quest.numWeeks} ${
                  quest.progressThisWeek >= quest.goalPerWeek
                    ? "🎉 Congratulations on hitting your goal!"
                    : "💪 You can do it!"
                }`}
              </Text>
            </>
          ) : (
            <>
              <Text>{"Congratulations on completing your quest! 🥳🥳🥳"}</Text>
              <Button
                variant="primary"
                disabled={isSubmitting}
                onPress={() => claimReward()}
              >
                <ButtonText style={fullWidthButton.text}>
                  {"Claim Reward"}
                </ButtonText>
                {error && <ErrorDisplay error={error} />}
              </Button>
            </>
          )}
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
        <AddNewLink text="Start a new quest" href="/quest/new" />
      </View>
    </Card>
  );
}
