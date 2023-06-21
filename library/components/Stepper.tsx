import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { Text, View, ViewProps } from "./Themed";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { numDecimalPlaces, roundToDecimal } from "library/utils/floats";

export type StepperProps = {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  decimalPlaces?: number;
  color?: string;
  colorInc?: string;
  colorDec?: string;
  onValueChange: (value: number) => void;
} & Omit<ViewProps, "children">;

export function Stepper(props: StepperProps) {
  const {
    min,
    max,
    step,
    initialValue,
    style,
    decimalPlaces,
    onValueChange,
    color,
    colorInc,
    colorDec,
    ...otherProps
  } = props;
  const [value, setValue] = useState(min);
  const [canIncrement, setCanIncrement] = useState(true);
  const [canDecrement, setCanDecrement] = useState(false);

  useEffect(() => {
    if (initialValue) updateValue(initialValue);
    if (value >= max) setCanIncrement(false);
    if (value <= min) setCanDecrement(false);
  }, []);

  function updateValue(value: number) {
    if (Number.isNaN(value)) return;
    let newValue: number;
    if (value >= max) {
      newValue = max;
      setCanDecrement(true);
      setCanIncrement(false);
    } else if (value <= min) {
      newValue = min;
      setCanDecrement(false);
      setCanIncrement(true);
    } else {
      newValue = value;
      setCanDecrement(true);
      setCanIncrement(true);
    }
    // Avoid floating point errors
    newValue = roundToDecimal(
      newValue,
      decimalPlaces ?? numDecimalPlaces(step),
    );
    setValue(newValue);
    onValueChange(value);
  }

  const colorScheme = useContext(ColorSchemeContext);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      height: 45,
      minWidth: 50,
      gap: 10,
    },
    button: {
      width: 40,
      height: 40,
      aspectRatio: 1,
      flexGrow: 0,
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      margin: 0,
      padding: 2,
    },
    buttonText: {
      fontFamily: "Header",
      fontSize: 18,
    },
    textInput: {
      flex: 1,
      height: 40,
      margin: 0,
      marginBottom: 0,
      minWidth: 35,
      fontFamily: "Header",
      fontSize: 20,
      borderRadius: 10,
      textAlign: "center",
      textAlignVertical: "center",
      backgroundColor: themes[colorScheme].cardBackground,
      color: themes[colorScheme].text,
    },
  });

  return (
    <View style={StyleSheet.flatten([styles.container, style])} {...otherProps}>
      <Button
        disabled={!canDecrement}
        style={styles.button}
        variant="primary"
        color={colorDec ?? color ?? undefined}
        onPress={() => updateValue(value - step)}
        accessibilityLabel={`Decrease value by ${step}`}
      >
        <Text style={styles.buttonText}>-</Text>
      </Button>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        aria-valuemax={max}
        aria-valuemin={min}
        value={value.toString()}
        onChangeText={(v) => updateValue(Number.parseFloat(v))}
      />
      <Button
        disabled={!canIncrement}
        style={styles.button}
        variant="primary"
        color={colorInc ?? color ?? undefined}
        onPress={() => updateValue(value + step)}
        accessibilityLabel={`Increase value by ${step}`}
      >
        <Text style={styles.buttonText}>+</Text>
      </Button>
    </View>
  );
}
