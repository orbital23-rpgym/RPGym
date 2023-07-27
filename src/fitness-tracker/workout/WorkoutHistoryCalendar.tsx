import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import {
  Theme as CalendarTheme,
  MarkedDates,
} from "react-native-calendars/src/types";

import { themes } from "constants/colors";
import { dropShadow } from "constants/styles";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useAppUser } from "library/context/UserContext";

export type WorkoutHistoryCalendarProps = {
  onSelect: (selected: Date) => void;
  selection: Date;
};
export default function WorkoutHistoryCalendar(
  props: WorkoutHistoryCalendarProps,
) {
  const { onSelect, selection } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const user = useAppUser();
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
  const workoutDot = { color: themes[colorScheme].orange };

  function formatForCalendar(date: Date): string {
    return format(date, "yyyy-MM-dd");
  }
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selectedDateString, setSelectedDateString] = useState<string>(
    formatForCalendar(selection),
  );
  const [loadedDatesData, setLoadedDatesData] = useState<{
    [date: string]: number;
  }>({});

  async function getDatesData(dates: Date[]) {
    const datesData = { ...loadedDatesData };
    const datesNotYetLoaded = dates.filter((date) => {
      return loadedDatesData[formatForCalendar(date)] === undefined;
    });
    datesNotYetLoaded.forEach((date) => {
      user.fitnessTracker.numWorkoutsOnDate(date).then((numMarks) => {
        datesData[formatForCalendar(date)] = numMarks;
      });
    });
    setLoadedDatesData(datesData);
    markDates();
    return datesData;
  }

  function selectDate(date: Date) {
    setMarkedDates({});
    onSelect(date);
  }

  async function markDates() {
    setMarkedDates({});
    const tempMarkedDates: MarkedDates = {};
    const dates = Object.keys(loadedDatesData);
    for (const date of dates) {
      const numWorkouts = loadedDatesData[date];
      const dots: MarkingProps["dots"] = [];
      for (let i = 0; i < numWorkouts; i++) {
        dots.push(workoutDot);
      }
      const dateString = date;
      const isSelected = date === selectedDateString;
      tempMarkedDates[dateString] = {
        ...tempMarkedDates[dateString],
        marked: true,
        dots: dots,
        selected: isSelected,
        disableTouchEvent: isSelected,
      };
    }
    setMarkedDates(tempMarkedDates);
  }

  function loadMonthOf(date: Date) {
    const interval: Interval = {
      start: startOfMonth(date),
      end: endOfMonth(date),
    };
    getDatesData(eachDayOfInterval(interval));
  }

  useEffect(() => {
    setSelectedDateString(formatForCalendar(props.selection));
    loadMonthOf(props.selection);
  }, [props.selection]);

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        style={styles.calendar}
        markingType={"multi-dot"}
        onDayPress={(data) => {
          const selected = new Date(data.timestamp);
          selectDate(selected);
        }}
        markedDates={markedDates}
        enableSwipeMonths={true}
        onVisibleMonthsChange={(monthsData) => {
          monthsData.forEach((monthData) => {
            const month = new Date(monthData.timestamp);
            loadMonthOf(month);
          });
        }}
        theme={CALENDAR_THEME}
        displayLoadingIndicator
        initialDate={selectedDateString}
      />
    </View>
  );
}
