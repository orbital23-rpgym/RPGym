import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isEqual,
  isSameDay,
  isToday,
  startOfMonth,
  sub,
} from "date-fns";
import { Stack } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";

import WorkoutHistoryCalendar from "./WorkoutHistoryCalendar";

import { Screen } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useUserContext } from "library/context/UserContext";

export default function WorkoutHistoryScreen() {
  const colorScheme = useContext(ColorSchemeContext);
  const user = useUserContext();
  const styles = StyleSheet.create({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Screen>
      <Stack.Screen options={{ title: "Workout History" }} />
      <WorkoutHistoryCalendar
        onSelect={setSelectedDate}
        initialSelection={selectedDate}
      />
    </Screen>
  );
}
