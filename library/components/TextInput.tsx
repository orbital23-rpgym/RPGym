import {
  TextInput as DefaultTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

/**
 * Custom styled text input.
 */
export function TextInput(props: TextInputProps) {
  const { style, ...otherProps } = props;
  const styles = StyleSheet.create({
    input: {
      backgroundColor: "#fff",
      color: "#000",
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
    ></DefaultTextInput>
  );
}
