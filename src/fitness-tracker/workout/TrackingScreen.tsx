import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

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
  });
  const [lastWorkout, setLastWorkout] = useState<Workout | null>(null);
  useEffect(() => {
    setLastWorkout(user.fitnessTracker.mostRecentWorkout);
  }, []);
  const lastWorkoutCardTitle = "🏋️ Last Workout";
  return (
    <Screen gap={20}>
      <Stack.Screen options={{ title: "Tracking" }} />
      <TrackingOverviewCard />
      {lastWorkout ? (
        <WorkoutOverviewCard
          title={lastWorkoutCardTitle}
          workout={lastWorkout}
        />
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
