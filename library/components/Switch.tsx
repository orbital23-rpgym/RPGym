import { useContext, useState } from "react";
import {
  Switch as DefaultSwitch,
  SwitchProps as DefaultSwitchProps,
} from "react-native";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type SwitchProps = {
  thumbColor?: string | { false: string; true: string };
} & Omit<DefaultSwitchProps, "ios_backgroundColor" | "thumbColor">;

export function Switch(props: SwitchProps) {
  const { trackColor, thumbColor, onValueChange, value: isOn = false } = props;
  const [isEnabled, setIsEnabled] = useState(isOn);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const colorScheme = useContext(ColorSchemeContext);
  const defaultTrackColor = {
    false: themes[colorScheme].gray,
    true: themes[colorScheme].green,
  };
  const defaultThumbColor = {
    false: themes[colorScheme].grayLight,
    true: themes[colorScheme].greenLight,
  };
  const newTrackColor = trackColor
    ? {
        false: trackColor.false ?? defaultTrackColor.false,
        true: trackColor.true ?? defaultTrackColor.true,
      }
    : defaultTrackColor;
  const newThumbColor = thumbColor
    ? typeof thumbColor === "string"
      ? {
          false: thumbColor,
          true: thumbColor,
        }
      : {
          false: thumbColor.false ?? defaultThumbColor.false,
          true: thumbColor.true ?? defaultThumbColor.true,
        }
    : defaultThumbColor;
  function onValueChangeWrapped(value: boolean) {
    onValueChange && onValueChange(value);
    toggleSwitch();
  }
  return (
    <DefaultSwitch
      trackColor={newTrackColor}
      thumbColor={isEnabled ? newThumbColor.true : newThumbColor.false}
      ios_backgroundColor={newTrackColor.false}
      onValueChange={onValueChangeWrapped}
      value={isEnabled}
    />
  );
}
