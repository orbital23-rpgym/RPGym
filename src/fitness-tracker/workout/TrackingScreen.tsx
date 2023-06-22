import { Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import TrackingOverviewCard from "./TrackingOverviewCard";
import Workout from "./Workout";
import WorkoutOverviewCard from "./WorkoutOverviewCard";

import { AddNewLink } from "library/components/AddNewLink";
import { Card } from "library/components/Card";
import { Screen, Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useUserContext } from "library/context/UserContext";

export default function TrackingScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useUserContext();
  const styles = StyleSheet.create({
    noWorkoutText: { textAlign: "center" },
  });
  const [lastWorkout, setLastWorkout] = useState<Workout | undefined>(
    undefined,
  );
  useEffect(() => {
    user.fitnessTracker.mostRecentWorkout().then(setLastWorkout);
  }, []);
  return (
    <Screen gap={20}>
      <Stack.Screen options={{ title: "Tracking" }} />
      <TrackingOverviewCard />
      {lastWorkout ? (
        <WorkoutOverviewCard workout={lastWorkout} />
      ) : (
        <Card title="🏋️ Last Workout">
          <Text style={styles.noWorkoutText}>
            {"You haven't completed any workouts yet."}
          </Text>
          <AddNewLink
            href="(tabs)/workout"
            text="Start a new workout"
            replace
          />
        </Card>
      )}
    </Screen>
  );
}
