import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { palette } from "constants/colors";

export type AvatarLayerProps = {
  source: number;
  zIndex: number;
};
export function AvatarLayer(props: AvatarLayerProps) {
  const { source, zIndex } = props;
  const styles = StyleSheet.create({
    layer: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.transparent,
      flex: 1,
      aspectRatio: 1,
      width: "100%",
      height: "100%",
      zIndex: zIndex,
      position: "absolute",
    },
  });

  return <Image source={source} style={styles.layer} contentFit="contain" />;
}
