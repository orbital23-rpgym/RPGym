import { useContext } from "react";
import {
  ButtonProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { Button } from "./Button";
import { ButtonText, HeadingText } from "./StyledText";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type HeadingWithExplainerButtonProps = {
  text: string;
  textId?: string;
  textStyle?: StyleProp<TextStyle>;
  onButtonPress?: ButtonProps["onPress"];
  containerStyle?: StyleProp<ViewStyle>;
};
export function HeadingWithExplainerButton(
  props: HeadingWithExplainerButtonProps,
) {
  const { text, containerStyle, textStyle, onButtonPress, textId } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
      gap: 10,
    },
    text: {
      textAlignVertical: "center",
    },
    button: {
      backgroundColor: themes[colorScheme].buttonDefaultBackground,
      width: 30,
      height: 30,
      padding: 0,
      margin: 0,
      borderRadius: 1000,
      alignContent: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: "Header",
      fontSize: 22,
      textAlign: "center",
      textAlignVertical: "center",
    },
  });

  return (
    <View style={StyleSheet.compose(styles.container, containerStyle)}>
      <HeadingText
        style={StyleSheet.compose(styles.text, textStyle)}
        id={textId}
      >
        {text}
      </HeadingText>
      <Button style={styles.button} onPress={onButtonPress}>
        <ButtonText style={styles.buttonText}>?</ButtonText>
      </Button>
    </View>
  );
}
