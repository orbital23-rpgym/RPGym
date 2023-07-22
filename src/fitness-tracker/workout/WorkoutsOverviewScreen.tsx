import { Stack, Tabs, useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet } from "react-native";

import WorkoutPresetsView from "./presets/WorkoutPresetsView";

import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Screen } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export default function WorkoutsOverviewScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({});
  const router = useRouter();
  return (
    <Screen>
      <Stack.Screen options={{ title: "Work Out" }} />
      <Button
        variant="primary"
        style={fullWidthButton.button}
        onPress={() => router.push("workout/new")}
      >
        <ButtonText style={fullWidthButton.text}>
          Start an empty workout
        </ButtonText>
      </Button>
      <HeadingText>Templates</HeadingText>

      <Button
        variant="secondary"
        style={fullWidthButton.button}
        onPress={() => router.push("/placeholder")}
      >
        <ButtonText style={fullWidthButton.text}>
          Create a new template
        </ButtonText>
      </Button>
      <WorkoutPresetsView />
    </Screen>
  );
}
