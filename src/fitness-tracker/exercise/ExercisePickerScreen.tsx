import { MaterialIcons } from "@expo/vector-icons";
import {
  Link,
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, ViewProps } from "react-native";

import Exercise from "./Exercise";
import ExerciseTemplate from "./ExerciseTemplate";

import { themes } from "constants/colors";
import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Screen, Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useCreateWorkoutFormContext } from "library/context/CreateWorkoutFormContext";
import { useUserContext } from "library/context/UserContext";

export default function ExercisePickerScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useUserContext();
  const router = useRouter();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
      gap: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    endingAction: {
      marginTop: 0,
      marginBottom: 0,
    },
    endingActionContainer: {
      width: "100%",
      gap: 20,
      marginTop: 20,
      alignItems: "center",
    },
  });

  const { data, setData } = useCreateWorkoutFormContext();

  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  function pickExercise(exerciseTemplate: ExerciseTemplate) {
    setData({ ...data, selectedExerciseTemplate: exerciseTemplate });
    // router.push("./exercise-list");
  }

  const [exerciseTemplatesData, setExerciseTemplatesData] = useState<
    { key: number; template: ExerciseTemplate }[] | undefined
  >(undefined);

  useEffect(() => {
    user.fitnessTracker.getExerciseTemplates().then((templates) => {
      const templatesData = templates.map((value, index, array) => {
        return { key: index, template: value };
      });
      setExerciseTemplatesData(templatesData);
    });
  }, []);

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: "Choose Exercise",
        }}
      />
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}

      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />

      <FlatList
        data={exerciseTemplatesData}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => pickExercise(item.template)}>
              <Text>item.template.name</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
