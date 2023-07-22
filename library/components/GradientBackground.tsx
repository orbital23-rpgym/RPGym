import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { branding } from "constants/colors";

export function GradientBackgroundScreen(
  props: Omit<LinearGradientProps, "colors" | "start" | "end" | "locations">,
) {
  const { style, children, ...otherProps } = props;
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    gradient: {
      width: "100%",
      height: "100%",
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      padding: 30,
      paddingTop: 55,
    },
  });

  return (
    <LinearGradient
      style={styles.gradient}
      colors={[branding.blue, branding.orange]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.25, 1]}
      {...otherProps}
    >
      <View style={StyleSheet.compose(styles.container, style)}>
        {children}
      </View>
    </LinearGradient>
  );
}
