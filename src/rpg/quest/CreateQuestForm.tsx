import { useContext, useState } from "react";
import { StyleSheet } from "react-native";

import { QuestDifficulty } from "./Quest";

import { themes } from "constants/colors";
import { QUEST_DURATION } from "constants/game";
import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { MultiSelect, MultiSelectOption } from "library/components/MultiSelect";
import { Stepper } from "library/components/Stepper";
import { ButtonText } from "library/components/StyledText";
import { Text, View } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export default function CreateQuestForm(props: {
  onSubmit: (
    timesPerWeek: number,
    difficulty: QuestDifficulty,
  ) => Promise<void>;
}) {
  const colorScheme = useContext(ColorSchemeContext);

  const [timesPerWeek, setTimesPerWeek] = useState(1);
  const [difficulty, setDifficulty] = useState<QuestDifficulty>("easy");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const difficultyOptions: MultiSelectOption[] = [
    {
      key: "easy",
      text: "Easy",
    },
    {
      key: "medium",
      text: "Medium",
    },
    {
      key: "hard",
      text: "Hard",
    },
  ];

  const submit = (timesPerWeek: number, difficulty: QuestDifficulty) => {
    // Disable submit button
    setIsSubmitting(true);
    // Reset list of errors
    setError(undefined);
    props
      .onSubmit(timesPerWeek, difficulty)
      .catch((e: Error) => {
        setError(e);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        How many days would you like to work out in a week?
      </Text>
      <Stepper
        min={1}
        max={7}
        step={1}
        onValueChange={setTimesPerWeek}
        style={styles.stepper}
        color={themes[colorScheme].blueLight}
      />

      <Text style={styles.question}>
        How challenging do you want the quest to be?
      </Text>
      <Text>
        Easy: {QUEST_DURATION.easy} weeks, medium: {QUEST_DURATION.medium}{" "}
        weeks, hard: {QUEST_DURATION.hard} weeks. Rewards increase with
        difficulty.
      </Text>
      <MultiSelect
        options={difficultyOptions}
        initial={0}
        onSelect={(selected) => setDifficulty(selected as QuestDifficulty)}
      />
      <Button
        style={fullWidthButton.button}
        variant="primary"
        onPress={() => submit(timesPerWeek, difficulty)}
      >
        <ButtonText style={fullWidthButton.text} disabled={isSubmitting}>
          {"Let's go!"}
        </ButtonText>
      </Button>
      {error && <ErrorDisplay error={error} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  stepper: {
    maxWidth: 150,
  },
  question: {
    fontFamily: "Header",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});
