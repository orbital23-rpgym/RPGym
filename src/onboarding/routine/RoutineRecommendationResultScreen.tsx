import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { RoutineRecommendationWorkoutCard } from "./RoutineRecommendationWorkoutCard";

import { STARTER_ROUTINES, StarterRoutineWorkout } from "constants/workout";
import { Button } from "library/components/Button";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { GradientBackgroundScreen } from "library/components/GradientBackground";
import { ButtonText, HeadingText } from "library/components/StyledText";
import {
  OnboardingEquipment,
  OnboardingFrequency,
  useOnboardingContext,
} from "library/context/OnboardingContext";
import { useAppUser } from "library/context/UserContext";
import { ExerciseData } from "src/fitness-tracker/exercise/Exercise";
import ExerciseTemplate from "src/fitness-tracker/exercise/ExerciseTemplate";
import { WeightRepsExerciseSetData } from "src/fitness-tracker/set/WeightRepsExerciseSet";
import WorkoutPreset from "src/fitness-tracker/workout/presets/WorkoutPreset";

export default function RoutineRecommendationResultScreen() {
  const user = useAppUser();
  const router = useRouter();
  const width = Dimensions.get("window").width;
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    promptText: {
      textAlign: "center",
      marginBottom: 20,
    },
    optionButton: {
      width: "80%",
      minWidth: 150,
      alignContent: "center",
      justifyContent: "center",
    },
    optionButtonText: {
      textAlign: "center",
    },
    routineContainer: {
      width: "100%",
      minHeight: 300,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    workoutCard: {},
  });

  const { data, setData } = useOnboardingContext();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [routine, setRoutine] = useState<StarterRoutineWorkout[]>([]);

  async function chooseStarterRoutine(
    equipment?: OnboardingEquipment,
    frequency?: OnboardingFrequency,
  ): Promise<StarterRoutineWorkout[]> {
    if (!equipment || !frequency) {
      throw new Error("Preferred equipment type or workout frequency not set.");
    }
    return STARTER_ROUTINES[equipment][frequency];
  }

  async function saveRoutine() {
    // save starter routine
    // this assumes user has not altered the default exercise templates
    const exerciseTemplates = await user.fitnessTracker.getExerciseTemplates();
    routine.forEach(({ name, description, exercises }) => {
      const exerciseData = exercises.map((exercise): ExerciseData => {
        const sets: WeightRepsExerciseSetData[] = [];
        for (let i = 0; i < exercise.numSets; i++) {
          sets.push({
            notes: "",
            perceivedExertion: exercise.rpe,
            weightKg: 0,
            reps: exercise.numReps,
          });
        }
        return {
          template: (
            exerciseTemplates[exercise.templateIndex] as ExerciseTemplate
          ).ref,
          sets: sets,
        };
      });
      WorkoutPreset.create(name, description, null, exerciseData, user.id);
    });
  }

  function submit() {
    // clear errors and set up submitting
    setError(undefined);
    setIsSubmitting(true);
    saveRoutine()
      .then(() => {
        router.push("/onboarding/tutorial");
      })
      .catch((reason) => setError(reason))
      .finally(() => setIsSubmitting(false));
  }

  useEffect(() => {
    chooseStarterRoutine(data.equipment, data.gymFrequency)
      .then((value) => setRoutine(value))
      .catch((reason) => {
        setError(reason);
      });
  }, [data]);

  return (
    <GradientBackgroundScreen>
      <Stack.Screen
        options={{
          headerTitle: "Routine",
          headerShown: true,
          headerBackButtonMenuEnabled: true,
        }}
      />
      <View style={styles.container}>
        <HeadingText style={styles.promptText}>
          {"Here's a starter gym routine for you to try!"}
        </HeadingText>
        {error && <ErrorDisplay error={error} />}
        <View style={styles.routineContainer}>
          <Carousel
            loop={false}
            width={width}
            height={300}
            autoPlay={false}
            mode="parallax"
            data={routine}
            scrollAnimationDuration={1000}
            renderItem={({ index }) => (
              <RoutineRecommendationWorkoutCard
                style={styles.workoutCard}
                workout={routine[index]}
                key={index}
              />
            )}
          />
        </View>
        <Button
          onPress={() => {
            submit();
          }}
          variant="primary"
          style={styles.optionButton}
          disabled={isSubmitting}
        >
          <ButtonText style={styles.optionButtonText}>
            {"Save routine"}
          </ButtonText>
        </Button>
        <Button
          onPress={() => {
            router.push("/onboarding/tutorial");
          }}
          variant="secondary"
          style={styles.optionButton}
        >
          <ButtonText style={styles.optionButtonText}>
            {"No thanks, I'll make my own"}
          </ButtonText>
        </Button>
      </View>
    </GradientBackgroundScreen>
  );
}
