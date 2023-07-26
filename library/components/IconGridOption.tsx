import { Image, ImageSource } from "expo-image";
import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";

import { Text } from "./Themed";

import { palette, themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type IconGridOptionProps = {
  label?: string;
  selected?: boolean;
  image?: ImageSource;
  color?: string;
  disabled?: boolean;
  onPress?: () => void;
} & Pick<ViewProps, "children">;
export function IconGridOption(props: IconGridOptionProps) {
  const colorScheme = useContext(ColorSchemeContext);
  const {
    label = "",
    selected: isSelected = false,
    image,
    color,
    onPress,
    children,
    disabled: isDisabled = false,
  } = props;
  const styles = StyleSheet.create({
    container: {
      gap: 5,
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 8,
      width: 71,
      opacity: isDisabled ? 0.5 : 1,
    },
    childContainer: {
      backgroundColor: isSelected
        ? themes[colorScheme].orange
        : themes[colorScheme].background,
      padding: 5,
      borderRadius: 5,
      aspectRatio: 1,
    },
    label: {
      fontFamily: "Header",
      fontSize: 12,
      textAlign: "center",
    },
    colorSolid: {
      width: "100%",
      height: "100%",
      backgroundColor: color ?? palette.transparent,
    },
    image: {
      width: "100%",
      height: "100%",
      flex: 1,
    },
  });
  const renderedChild = image ? (
    <Image source={image} contentFit="contain" style={styles.image} />
  ) : color ? (
    <View style={styles.colorSolid} />
  ) : (
    children
  );
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      disabled={isDisabled}
    >
      <View style={styles.container}>
        <View style={styles.childContainer}>{renderedChild}</View>
        {label !== "" && <Text style={styles.label}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
}
