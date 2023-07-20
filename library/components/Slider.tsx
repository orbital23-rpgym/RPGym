import {
  Slider as DefaultSlider,
  SliderProps as DefaultSliderProps,
} from "@miblanchard/react-native-slider";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { numDecimalPlaces, roundToDecimal } from "library/utils/floats";

export type SliderProps = {
  min: number;
  max: number;
  step: number;
  showLegend?: boolean;
  bgColor?: string;
  fgColor?: string;
  thumbColor?: string;
  animationType?: "spring" | "timing";
  onValueChange?: (value: number) => void;
} & Omit<
  DefaultSliderProps,
  | "minimumValue"
  | "maximumValue"
  | "minimumTrackTintColor"
  | "maximumTrackTintColor"
  | "animationType"
  | "onValueChange"
>;

/**
 * Single-value slider with default styling and labels.
 */
export function Slider(props: SliderProps) {
  const colorScheme = useContext(ColorSchemeContext);
  const {
    step,
    min,
    max,
    bgColor = themes[colorScheme].cardBackground,
    fgColor = themes[colorScheme].orange,
    thumbColor,
    animationType,
    onValueChange = () => null,
    showLegend: shouldShowLegend = false,
    ...otherProps
  } = props;
  const [value, setValue] = useState(min);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      gap: 0,
      minWidth: 150,
      width: 200,
    },
    labelText: {
      flex: 1,
      fontFamily: "Header",
      fontSize: 18,
      textAlign: "right",
      width: "100%",
      padding: 0,
      margin: 0,
    },
    legendContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    spacer: {
      flex: 1,
    },
    legendText: {
      flex: 1,
      fontFamily: "BodyRegular",
      fontSize: 13,
      textAlignVertical: "center",
      padding: 0,
      margin: 0,
    },
    legendLeft: {
      textAlign: "left",
    },
    legendRight: {
      textAlign: "right",
    },
    slider: {
      width: "100%",
    },
    thumb: {
      width: 8,
      height: 20,
      borderRadius: 100,
      backgroundColor: thumbColor ?? themes[colorScheme].text,
    },
    track: {
      height: 6,
      borderRadius: 100,
    },
  });

  const precision = numDecimalPlaces(step);

  function updateValue(value: number) {
    // Avoid floating point errors
    const newValue = roundToDecimal(value, precision);
    setValue(newValue);
    onValueChange(newValue);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{value.toFixed(precision)}</Text>
      <DefaultSlider
        step={step}
        minimumValue={min}
        maximumValue={max}
        minimumTrackTintColor={fgColor}
        maximumTrackTintColor={bgColor}
        containerStyle={styles.slider}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        // minimumTrackStyle={styles.trackSelected}
        onValueChange={(value: number[]) => updateValue(value[0])}
        value={value}
        animationType={animationType}
        animateTransitions
        {...otherProps}
      />
      {shouldShowLegend && (
        <View style={styles.legendContainer}>
          <Text style={[styles.legendText, styles.legendLeft]}>
            {min.toFixed(precision)}
          </Text>
          <View style={styles.spacer} />
          <Text style={[styles.legendText, styles.legendRight]}>
            {max.toFixed(precision)}
          </Text>
        </View>
      )}
    </View>
  );
}
