import { useContext, useState } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";

import { themes } from "constants/colors";
import { Button, ButtonProps } from "library/components/Button";
import { ButtonText } from "library/components/StyledText";
import { View, ViewProps } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type MultiSelectButtonProps = {
  text: string;
  selected: boolean;
  selectedColor?: string;
  unselectedColor?: string;
} & Omit<ButtonProps, "style">;
function MultiSelectButton(props: MultiSelectButtonProps) {
  const {
    onPress,
    text,
    selected: isSelected,
    selectedColor,
    unselectedColor,
    ...otherProps
  } = props;

  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    option: {
      flex: 1,
      backgroundColor: unselectedColor ?? themes[colorScheme].cardBackground,
      justifyContent: "center",
      alignItems: "center",
    },
    selected: {
      flex: 1,
      backgroundColor: selectedColor ?? themes[colorScheme].blueLight,
      opacity: 1,
    },
    optionText: {
      textAlign: "center",
      fontSize: 16,
    },
  });

  function onPressWrapped(event: GestureResponderEvent) {
    onPress && onPress(event);
  }
  return (
    <Button
      style={
        isSelected
          ? StyleSheet.compose(styles.option, styles.selected)
          : styles.option
      }
      onPress={onPressWrapped}
      disabled={isSelected}
      {...otherProps}
    >
      <ButtonText style={styles.optionText}>{text}</ButtonText>
    </Button>
  );
}

export type MultiSelectOption = {
  key: string;
  text: string;
};
export type MultiSelectProps = {
  options: MultiSelectOption[];
  initial: number;
  selectedColor?: string;
  unselectedColor?: string;
  onSelect: (selected: string) => void;
} & Omit<ViewProps, "children">;
export function MultiSelect(props: MultiSelectProps) {
  const {
    style,
    options,
    onSelect,
    initial,
    selectedColor,
    unselectedColor,
    ...otherProps
  } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const [selected, setSelected] = useState(initial);
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      gap: 10,
    },
    option: {
      flex: 1,
      backgroundColor: themes[colorScheme].cardBackground,
    },
  });
  function selectOption(i: number, key: string) {
    setSelected(i);
    onSelect(key);
  }
  const optionButtons = options.map((option, i) => {
    return (
      <MultiSelectButton
        text={option.text}
        selected={selected === i}
        key={i}
        onPress={() => selectOption(i, option.key)}
        selectedColor={selectedColor}
        unselectedColor={unselectedColor}
        {...otherProps}
      />
    );
  });
  return (
    <View style={StyleSheet.compose(styles.container, style)}>
      {optionButtons}
    </View>
  );
}
