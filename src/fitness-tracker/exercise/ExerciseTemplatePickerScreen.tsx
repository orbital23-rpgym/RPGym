import { Link, Stack, useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ExerciseTemplate from "./ExerciseTemplate";

import { themes } from "constants/colors";
import { NEW_SET_DATA } from "constants/workout";
import { Card } from "library/components/Card";
import { HeadingText } from "library/components/StyledText";
import { Screen, Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import {
  TempExerciseData,
  useCreateWorkoutFormContext,
} from "library/context/CreateWorkoutFormContext";
import { useAppUser } from "library/context/UserContext";

export default function ExerciseTemplatePickerScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useContext(ColorSchemeContext);
  const user = useAppUser();
  const router = useRouter();
  const styles = StyleSheet.create({
    listOuter: {
      width: "100%",
    },
    listInner: {
      gap: 20,
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
    },
    categoryLabel: {
      color: themes[colorScheme].textSecondary,
      fontSize: 18,
    },
    card: {
      gap: 10,
      width: "100%",
    },
    cardPressable: {
      width: "100%",
    },
    cardPressed: {
      opacity: 0.6,
    },
    screen: {
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });

  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  const { data, setData } = useCreateWorkoutFormContext();

  function pickExercise(exerciseTemplate: ExerciseTemplate) {
    const { exercises, selectedExercise, selectedSet, ...otherData } = data;
    // create new set
    const newSetData = NEW_SET_DATA(0);
    const newExerciseData: TempExerciseData = {
      key: exercises.length,
      template: exerciseTemplate,
      deleted: false,
      sets: [newSetData],
    };

    // auto redirect to sets screen
    const newData = {
      ...otherData,
      exercises: exercises.concat(newExerciseData),
      selectedExercise: newExerciseData,
      selectedSet: newSetData,
    };
    setData(newData);
    router.push("/workout/new?goToSet=true");
  }

  const [exerciseTemplatesData, setExerciseTemplatesData] = useState<
    { key: number; template: ExerciseTemplate }[] | undefined
  >(undefined);

  useEffect(() => {
    user.fitnessTracker.getExerciseTemplates().then((templates) => {
      const templatesData = templates.map((value, index) => {
        return { key: index, template: value };
      });
      setExerciseTemplatesData(templatesData);
    });
  }, []);

  return (
    <Screen noScroll style={styles.screen}>
      <Stack.Screen
        options={{
          headerTitle: "Choose Exercise",
          headerRight: () => null,
        }}
      />
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}

      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
      <View style={styles.listOuter}>
        <FlatList
          data={exerciseTemplatesData}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => pickExercise(item.template)}
                style={({ pressed }) =>
                  pressed
                    ? StyleSheet.compose(
                        styles.cardPressable,
                        styles.cardPressed,
                      )
                    : styles.cardPressable
                }
              >
                <Card style={styles.card}>
                  <HeadingText>{item.template.name}</HeadingText>
                  <Text style={styles.categoryLabel}>
                    {item.template.category}
                  </Text>
                </Card>
              </Pressable>
            );
          }}
          style={styles.listOuter}
          contentContainerStyle={styles.listInner}
        />
      </View>
    </Screen>
  );
}
