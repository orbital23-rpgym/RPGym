import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

import { branding } from "constants/colors";

export default function GradientBackgroundScreen(
  props: Omit<LinearGradientProps, "colors" | "start" | "end" | "locations">,
) {
  const { style, ...otherProps } = props;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      padding: 30,
      paddingTop: 50,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
  });

  return (
    <LinearGradient
      style={StyleSheet.compose(styles.container, style)}
      colors={[branding.blue, branding.orange]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.25, 1]}
      {...otherProps}
    />
  );
}
