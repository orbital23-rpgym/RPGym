import { FontAwesome5 } from "@expo/vector-icons";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  intlFormat,
  isEqual,
  isSameDay,
  isToday,
  startOfMonth,
  sub,
} from "date-fns";
import { Stack, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Workout from "./Workout";
import WorkoutHistoryCalendar from "./WorkoutHistoryCalendar";
import { WorkoutOverview } from "./WorkoutOverview";

import { themes } from "constants/colors";
import { AddNewLink } from "library/components/AddNewLink";
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
  const [displayedWorkout, setDisplayedWorkout] = useState<Workout | undefined>(
    undefined,
  );
  const [hasPreviousWorkout, setHasPreviousWorkout] = useState<boolean>(true);
  const [hasNextWorkout, setHasNextWorkout] = useState<boolean>(true);

  const { date } = useLocalSearchParams();

  useEffect(() => {
    if (date) {
      selectDate(new Date(parseInt(date as string)));
    } else {
      selectDate(new Date());
    }
  }, [date]);

  function selectDate(date: Date, workoutToDisplay?: Workout) {
    setSelectedDate(date);
    user.fitnessTracker.getWorkoutsWithDate(date).then((workouts) => {
      setSelectedDateWorkouts(workouts);
      setDisplayedWorkout(workoutToDisplay ?? workouts.at(0));

      user.fitnessTracker.getPreviousWorkout(date).then((workout) => {
        setHasPreviousWorkout(workout !== undefined);
      });

      user.fitnessTracker.getNextWorkout(date).then((workout) => {
        setHasNextWorkout(workout !== undefined);
      });
    });
  }

  function goToPreviousWorkout() {
    user.fitnessTracker.getPreviousWorkout(selectedDate).then((workout) => {
      // If there is no previous workout, do nothing
      if (!workout) {
        setHasPreviousWorkout(false);
        return;
      }
      selectDate(workout.startDateTime, workout);
    });
  }

  function goToNextWorkout() {
    user.fitnessTracker.getNextWorkout(selectedDate).then((workout) => {
      // If there is no next workout, do nothing
      if (!workout) {
        setHasNextWorkout(false);
        return;
      }
      selectDate(workout.startDateTime, workout);
    });
  }

  return (
    <Screen gap={20}>
      <Stack.Screen options={{ title: "Workout History" }} />
      <WorkoutHistoryCalendar onSelect={selectDate} selection={selectedDate} />
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
                ` (${selectedDateWorkouts.indexOf(displayedWorkout) + 1}/${
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
