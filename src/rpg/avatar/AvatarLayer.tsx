import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { palette } from "constants/colors";
import { View } from "library/components/Themed";

export type AvatarLayerProps = {
  source: number;
};
export function AvatarLayer(props: AvatarLayerProps) {
  const { source } = props;

  return (
    // wrap in View if not it will not layer on web
    <View style={avatarLayerStyles.layer}>
      <Image
        source={source}
        style={avatarLayerStyles.layer}
        contentFit="contain"
      />
    </View>
  );
}

export const avatarLayerStyles = StyleSheet.create({
  layer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.transparent,
    flex: 1,
    aspectRatio: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
});
