import { Tabs } from "expo-router";
import { useContext } from "react";
import { StyleSheet } from "react-native";

import WorkoutPresetsView from "./presets/WorkoutPresetsView";

import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Screen } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export default function AddWorkoutScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({});
  return (
    <Screen>
      <Button variant="primary" style={fullWidthButton.button}>
        <ButtonText style={fullWidthButton.text}>
          Start an empty workout
        </ButtonText>
      </Button>
      <HeadingText>Templates</HeadingText>

      <Button variant="secondary" style={fullWidthButton.button}>
        <ButtonText style={fullWidthButton.text}>
          Create a new template
        </ButtonText>
      </Button>
      <WorkoutPresetsView />
    </Screen>
  );
}
