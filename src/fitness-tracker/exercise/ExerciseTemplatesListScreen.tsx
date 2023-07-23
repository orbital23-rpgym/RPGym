import HighlightText from "@sanar/react-native-highlight-text";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TextProps, TouchableOpacity } from "react-native";

import ExerciseTemplate from "./ExerciseTemplate";

import { palette, themes } from "constants/colors";
import { dropShadow, fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { Card } from "library/components/Card";
import { ButtonText } from "library/components/StyledText";
import { TextInput } from "library/components/TextInput";
import { Screen, Text, View } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useAppUser } from "library/context/UserContext";

export default function ExerciseTemplatesListScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useAppUser();
  const router = useRouter();
  const styles = StyleSheet.create({
    templateContainer: {
      width: "100%",
      gap: 20,
    },
    templateWrapper: {
      width: "100%",
    },
    noTemplateText: {
      textAlign: "center",
    },
    searchField: {
      backgroundColor: themes[colorScheme].cardBackground,
      ...dropShadow(themes[colorScheme].shadowColor),
      padding: 12,
      borderRadius: 8,
      fontFamily: "Header",
      fontSize: 20,
      width: "100%",
      color: themes[colorScheme].text,
    },
    exerciseContainer: {
      padding: 2,
      gap: 5,
      backgroundColor: palette.transparent,
    },
    exerciseName: {
      fontFamily: "Header",
      fontSize: 20,
    },
    highlightedExerciseName: {
      backgroundColor: themes[colorScheme].blueLight,
    },
    exerciseCategory: {
      fontFamily: "Header",
      fontSize: 18,
      color: themes[colorScheme].textSecondary,
    },
    highlightedExerciseCategory: {
      color: themes[colorScheme].text,
      backgroundColor: themes[colorScheme].blueLight,
    },
  });

  const [templates, setTemplates] = useState<ExerciseTemplate[]>([]);
  const { q: query } = useLocalSearchParams<{ q?: string }>();
  const [filteredTemplates, setFilteredTemplates] = useState<
    ExerciseTemplate[]
  >([]);

  useEffect(() => {
    if (!query || query === "") {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(
        templates.filter(
          (value) =>
            value.category.toLowerCase().includes(query.toLowerCase()) ||
            value.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
  }, [query, templates]);

  useEffect(() => {
    user.fitnessTracker
      .getExerciseTemplates()
      .then((templates) => setTemplates(templates));
  }, [user.fitnessTracker]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTitle: "Exercise List",
        }}
      />
      <Button
        variant="secondary"
        onPress={() => {
          router.push("/workout/exercises/new");
        }}
        style={fullWidthButton.button}
      >
        <ButtonText style={fullWidthButton.text}>
          {"Add new exercise"}
        </ButtonText>
      </Button>
      <TextInput
        placeholder="Search"
        style={styles.searchField}
        placeholderTextColor={themes[colorScheme].gray}
        onChangeText={(text) => {
          router.setParams({ q: text });
        }}
      />
      <View style={styles.templateContainer}>
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((et, k) => (
            <TouchableOpacity
              key={k}
              activeOpacity={0.5}
              onPress={() => router.push("/workout/exercises/detail")}
              style={styles.templateWrapper}
            >
              <Card>
                <View style={styles.exerciseContainer}>
                  <HighlightText
                    highlightStyle={styles.highlightedExerciseName}
                    searchWords={query?.split(" ") ?? []}
                    textToHighlight={et.name}
                    textComponent={({ style, ...otherProps }: TextProps) => (
                      <Text style={styles.exerciseName} {...otherProps} />
                    )}
                  />
                  <HighlightText
                    highlightStyle={styles.highlightedExerciseCategory}
                    searchWords={query?.split(" ") ?? []}
                    textToHighlight={et.category}
                    textComponent={({ style, ...otherProps }: TextProps) => (
                      <Text style={styles.exerciseCategory} {...otherProps} />
                    )}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTemplateText}>{"No templates found."}</Text>
        )}
      </View>
    </Screen>
  );
}
