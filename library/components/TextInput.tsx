import { useContext } from "react";
import {
  TextInput as DefaultTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

/**
 * Custom styled text input.
 */
export function TextInput(props: TextInputProps) {
  const colorScheme = useContext(ColorSchemeContext);
  const { style, ...otherProps } = props;
  const styles = StyleSheet.create({
    input: {
      backgroundColor: themes[colorScheme].white,
      color: themes[colorScheme].black,
      fontSize: 16,
      fontFamily: "BodyRegular",
      margin: 5,
      padding: 3,
      paddingLeft: 7,
      paddingRight: 7,
      minWidth: 150,
      width: 200,
      marginBottom: 20,
      borderRadius: 5,
    },
  });

  return (
    <DefaultTextInput
      style={StyleSheet.flatten([styles.input, style])}
      {...otherProps}
    />
  );
}
