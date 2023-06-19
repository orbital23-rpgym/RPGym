import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { Text, View, ViewProps } from "./Themed";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type StepperProps = {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  decimalPlaces?: number;
  colorInc?: string;
  colorDec?: string;
} & ViewProps;

export function Stepper(props: StepperProps) {
  const { min, max, step, initialValue, style, decimalPlaces, ...otherProps } =
    props;
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
    // Round to given decimal places (or precision of step, if not specified)
    const stepPrecision =
      step % 1 > 0 ? step.toString().split(".")[1].length : 0;
    newValue = Number.parseFloat(
      newValue.toFixed(decimalPlaces ?? stepPrecision),
    );
    setValue(newValue);
  }

  const colorScheme = useContext(ColorSchemeContext);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      height: 40,
      minWidth: 50,
      gap: 10,
    },
    button: {
      width: 35,
      height: 35,
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
      height: 35,
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
        onPress={() => updateValue(value + step)}
        accessibilityLabel={`Increase value by ${step}`}
      >
        <Text style={styles.buttonText}>+</Text>
      </Button>
    </View>
  );
}
