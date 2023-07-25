import { FontAwesome5 } from "@expo/vector-icons";
import { intlFormat } from "date-fns";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Workout from "./Workout";
import WorkoutHistoryCalendar from "./WorkoutHistoryCalendar";
import { WorkoutOverview } from "./WorkoutOverview";

import { themes } from "constants/colors";
// import { AddNewLink } from "library/components/AddNewLink";
import { Card } from "library/components/Card";
import { HeadingText } from "library/components/StyledText";
import { Screen, Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useAppUser } from "library/context/UserContext";

export default function WorkoutHistoryScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useAppUser();
  const styles = StyleSheet.create({
    workoutCarouselControls: {
      flexDirection: "row",
      flex: 10,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    },
    workoutCarouselButton: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      paddingLeft: 10,
      paddingRight: 10,
    },
    workoutCarouselButtonDisabled: {
      opacity: 0.5,
    },
    workoutCarouselTitle: {
      flex: 1,
      textAlign: "center",
    },
    noWorkoutText: {
      color: themes[colorScheme].textBlue,
    },
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateWorkouts, setSelectedDateWorkouts] = useState<Workout[]>(
    [],
  );
  const [selectedDateWorkoutIndex, setSelectedDateWorkoutIndex] =
    useState<number>(0);
  const [displayedWorkout, setDisplayedWorkout] = useState<Workout | undefined>(
    undefined,
  );
  const [hasPreviousWorkout, setHasPreviousWorkout] = useState<boolean>(true);
  const [hasNextWorkout, setHasNextWorkout] = useState<boolean>(true);

  const { date } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (date) {
      router.setParams(undefined);
      const parsedDate = new Date(parseInt(date as string));
      selectDate(parsedDate);
      checkHasNextWorkout();
      checkHasPreviousWorkout();
    } else {
      const now = new Date();
      selectDate(now);
      checkHasNextWorkout();
      checkHasPreviousWorkout();
    }
  }, [date]);

  async function selectDate(date: Date, end?: boolean) {
    const workouts = await user.fitnessTracker.getWorkoutsWithDate(date);
    const previousWorkout = await user.fitnessTracker.getPreviousWorkout(date);
    const nextWorkout = await user.fitnessTracker.getNextWorkout(date);
    setSelectedDate(date);
    setSelectedDateWorkouts(workouts);
    setSelectedDateWorkoutIndex(end ? workouts.length - 1 : 0);
    setHasPreviousWorkout(previousWorkout !== undefined);
    setHasNextWorkout(nextWorkout !== undefined);
  }

  async function checkHasPreviousWorkout() {
    if (selectedDateWorkouts.length > 0 && selectedDateWorkoutIndex > 0) {
      setHasPreviousWorkout(true);
    } else {
      const previousWorkout = await user.fitnessTracker.getPreviousWorkout(
        selectedDate,
      );
      setHasPreviousWorkout(previousWorkout !== undefined);
    }
  }

  async function checkHasNextWorkout() {
    if (
      selectedDateWorkouts.length > 0 &&
      selectedDateWorkoutIndex < selectedDateWorkouts.length - 1
    ) {
      setHasNextWorkout(true);
    } else {
      const nextWorkout = await user.fitnessTracker.getNextWorkout(
        selectedDate,
      );
      setHasNextWorkout(nextWorkout !== undefined);
    }
  }

  function goToPreviousWorkout() {
    if (selectedDateWorkouts.length > 0 && selectedDateWorkoutIndex > 0) {
      setSelectedDateWorkoutIndex(selectedDateWorkoutIndex - 1);
      setHasNextWorkout(true);
      checkHasPreviousWorkout();
    } else {
      user.fitnessTracker
        .getPreviousWorkout(displayedWorkout?.startDateTime ?? selectedDate)
        .then((workout) => {
          // If there is no previous workout, do nothing
          if (!workout) {
            setHasPreviousWorkout(false);
            return;
          }
          selectDate(workout.startDateTime, true);
          checkHasNextWorkout();
          checkHasPreviousWorkout();
        });
    }
  }

  function goToNextWorkout() {
    if (
      selectedDateWorkouts.length > 0 &&
      selectedDateWorkoutIndex < selectedDateWorkouts.length - 1
    ) {
      setSelectedDateWorkoutIndex(selectedDateWorkoutIndex + 1);
      setHasPreviousWorkout(true);
      checkHasNextWorkout();
    } else {
      user.fitnessTracker
        .getNextWorkout(displayedWorkout?.startDateTime ?? selectedDate)
        .then((workout) => {
          // If there is no next workout, do nothing
          if (!workout) {
            setHasNextWorkout(false);
            return;
          }
          selectDate(workout.startDateTime);
          checkHasPreviousWorkout();
          checkHasNextWorkout();
        });
    }
  }

  useEffect(() => {
    setDisplayedWorkout(selectedDateWorkouts.at(selectedDateWorkoutIndex));
  }, [selectedDateWorkouts, selectedDateWorkoutIndex]);

  useEffect(() => {
    checkHasNextWorkout();
    checkHasPreviousWorkout();
  }, [displayedWorkout]);

  return (
    <Screen gap={20}>
      <Stack.Screen options={{ title: "Workout History" }} />
      <WorkoutHistoryCalendar
        onSelect={(date) => {
          selectDate(date);
        }}
        selection={new Date(selectedDate)}
      />
      <Card
        customHeaderBar={
          <View style={styles.workoutCarouselControls}>
            <TouchableOpacity
              onPress={() => goToPreviousWorkout()}
              style={
                hasPreviousWorkout
                  ? styles.workoutCarouselButton
                  : StyleSheet.compose(
                      styles.workoutCarouselButton,
                      styles.workoutCarouselButtonDisabled,
                    )
              }
              disabled={!hasPreviousWorkout}
            >
              <FontAwesome5
                name="chevron-left"
                color={themes[colorScheme].text}
                size={25}
              />
            </TouchableOpacity>
            <HeadingText style={styles.workoutCarouselTitle}>
              Workout
              {displayedWorkout &&
                selectedDateWorkouts.length > 1 &&
                ` (${selectedDateWorkoutIndex + 1}/${
                  selectedDateWorkouts.length
                })`}
            </HeadingText>
            <TouchableOpacity
              onPress={() => goToNextWorkout()}
              style={
                hasNextWorkout
                  ? styles.workoutCarouselButton
                  : StyleSheet.compose(
                      styles.workoutCarouselButton,
                      styles.workoutCarouselButtonDisabled,
                    )
              }
              disabled={!hasNextWorkout}
            >
              <FontAwesome5
                name="chevron-right"
                color={themes[colorScheme].text}
                size={25}
              />
            </TouchableOpacity>
          </View>
        }
      >
        {displayedWorkout ? (
          <WorkoutOverview workout={displayedWorkout} />
        ) : (
          <>
            <Text style={styles.noWorkoutText}>
              No workout on{" "}
              {intlFormat(selectedDate, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
            {/* <AddNewLink
              href="/(tabs)/workout"
              replace
              text={"Add new workout"}
            /> */}
          </>
        )}
      </Card>
    </Screen>
  );
}
