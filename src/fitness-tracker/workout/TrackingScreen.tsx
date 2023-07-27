import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import TrackingOverviewCard from "./TrackingOverviewCard";
import Workout from "./Workout";
import { WorkoutOverviewCard } from "./WorkoutOverview";

import { fullWidthButton } from "constants/styles";
import { AddNewLink } from "library/components/AddNewLink";
import { Button } from "library/components/Button";
import { Card } from "library/components/Card";
import { ButtonText } from "library/components/StyledText";
import { Screen, Text } from "library/components/Themed";
import { useAppUser } from "library/context/UserContext";

export default function TrackingScreen() {
  const user = useAppUser();
  const router = useRouter();
  const styles = StyleSheet.create({
    noWorkoutText: { textAlign: "center" },
    lastWorkoutContainer: { width: "100%" },
  });
  const [lastWorkout, setLastWorkout] = useState<Workout | null>(null);
  useEffect(() => {
    user.fitnessTracker
      .getMostRecentWorkout()
      .then((result) => setLastWorkout(result));
  }, [user]);

  const lastWorkoutCardTitle = "🏋️ Last Workout";
  return (
    <Screen gap={20}>
      <Stack.Screen options={{ title: "Tracking" }} />
      <TrackingOverviewCard />
      {lastWorkout ? (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            router.push(
              "/workout/history?date=" + lastWorkout.startDateTime.getTime(),
            )
          }
          style={styles.lastWorkoutContainer}
        >
          <WorkoutOverviewCard
            title={lastWorkoutCardTitle}
            workout={lastWorkout}
          />
        </TouchableOpacity>
      ) : (
        <Card title={lastWorkoutCardTitle}>
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
      <Button
        variant="secondary"
        style={fullWidthButton.button}
        onPress={() => router.push("workout/exercises/manage")}
      >
        <ButtonText style={fullWidthButton.text}>{"My Exercises"}</ButtonText>
      </Button>
    </Screen>
  );
}
