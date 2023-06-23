import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
  sub,
} from "date-fns";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  Theme as CalendarTheme,
  MarkedDates,
} from "react-native-calendars/src/types";

import { themes } from "constants/colors";
import { dropShadow } from "constants/styles";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useUserContext } from "library/context/UserContext";
import onlyUnique from "library/utils/arrays";

export type WorkoutHistoryCalendarProps = {
  onSelect: (selected: Date) => void;
};
export default function WorkoutHistoryCalendar(
  props: WorkoutHistoryCalendarProps,
) {
  const onSelect = props.onSelect;
  const colorScheme = useContext(ColorSchemeContext);
  const user = useUserContext();
  const styles = StyleSheet.create({
    calendarContainer: {
      width: "100%",
    },
    calendar: {
      position: "relative",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: 10,
      ...dropShadow(themes[colorScheme].shadowColor),
    },
  });
  const CALENDAR_THEME: CalendarTheme = {
    backgroundColor: themes[colorScheme].cardBackground,
    calendarBackground: themes[colorScheme].cardBackground,
    textSectionTitleColor: themes[colorScheme].text,
    textSectionTitleDisabledColor: themes[colorScheme].textSecondary,
    selectedDayBackgroundColor: themes[colorScheme].blueLight,
    selectedDayTextColor: themes[colorScheme].text,
    todayTextColor: themes[colorScheme].text,
    dayTextColor: themes[colorScheme].text,
    textDisabledColor: themes[colorScheme].textSecondary,
    arrowColor: themes[colorScheme].blueLight,
    disabledArrowColor: themes[colorScheme].gray,
    monthTextColor: themes[colorScheme].text,
    indicatorColor: themes[colorScheme].text,
    textDayFontFamily: "Header",
    textMonthFontFamily: "Header",
    textDayHeaderFontFamily: "Header",
    textDayFontSize: 14,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 14,
  };

  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [loadedDates, setLoadedDates] = useState<Date[]>([]);

  useEffect(() => {
    const initialInterval: Interval = {
      start: sub(startOfMonth(selectedDate), { weeks: 1 }),
      end: add(endOfMonth(selectedDate), { weeks: 1 }),
    };
    loadDates(eachDayOfInterval(initialInterval));
  }, []);

  async function loadDates(dates: Date[]) {
    const concatDates = loadedDates.concat(dates);
    const newLoadedDates = onlyUnique(concatDates);
    await markDates(newLoadedDates);
    setLoadedDates(newLoadedDates);
  }

  async function markDates(dates: Date[]) {
    const tempMarkedDates: MarkedDates = {};
    for (const date of dates) {
      const hasWorkout = await user.fitnessTracker.hasWorkoutOnDate(date);
      const dateString = format(date, "yyyy-MM-dd");
      const isSelected = isSameDay(date, selectedDate);
      tempMarkedDates[dateString] = {
        ...tempMarkedDates[dateString],
        marked: true,
        dotColor: hasWorkout ? themes[colorScheme].orange : "transparent",
        selected: isSelected,
        disableTouchEvent: isSelected,
      };
    }
    setMarkedDates(tempMarkedDates);
  }

  function selectDate(date: Date) {
    const dateString = format(date, "yyyy-MM-dd");
    const tempMarkedDates: MarkedDates = {};
    for (const key in markedDates) {
      const markedDate = markedDates[key];
      tempMarkedDates[key] = markedDate;
      markedDate.selected = key === dateString;
      markedDate.disableTouchEvent = markedDate.selected;
    }
    setMarkedDates(markedDates);
    setSelectedDate(date);
    onSelect(date);
  }

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        style={styles.calendar}
        onDayPress={(data) => {
          const selected = new Date(data.timestamp);
          selectDate(selected);
        }}
        markedDates={markedDates}
        enableSwipeMonths={true}
        onVisibleMonthsChange={(monthsData) => {
          setMarkedDates({});
          monthsData.forEach((monthData) => {
            const month = new Date(monthData.timestamp);
            const interval: Interval = {
              start: startOfMonth(month),
              end: endOfMonth(month),
            };
            loadDates(eachDayOfInterval(interval));
          });
        }}
        theme={CALENDAR_THEME}
        displayLoadingIndicator
      />
    </View>
  );
}
