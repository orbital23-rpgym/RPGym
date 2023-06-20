import { StyleSheet } from "react-native";

import { AVATAR_BASE } from "./avatar-images";
import { AvatarLayer } from "./AvatarLayer";

import { palette } from "constants/colors";
import { View } from "library/components/Themed";
import AvatarBase from "src/rpg/avatar/AvatarBase";

type AvatarBaseProps = {
  avatarBase: AvatarBase;
  zIndex: number;
};

export default function AvatarBaseRenderer(props: AvatarBaseProps) {
  const { avatarBase, zIndex } = props;
  const styles = StyleSheet.create({
    container: {
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

  return (
    <View style={styles.container}>
      <AvatarLayer
        source={AVATAR_BASE.base[avatarBase.bodySize][avatarBase.skinColor]}
        zIndex={zIndex + 1}
      />
      <AvatarLayer
        source={AVATAR_BASE.base[avatarBase.bodySize].clothes}
        zIndex={zIndex + 2}
      />
      <AvatarLayer
        source={AVATAR_BASE.backHair[avatarBase.hairColor][avatarBase.backHair]}
        zIndex={zIndex + 3}
      />
      <AvatarLayer
        source={
          AVATAR_BASE.frontHair[avatarBase.hairColor][avatarBase.frontHair]
        }
        zIndex={zIndex + 4}
      />
      <AvatarLayer
        source={
          AVATAR_BASE.faceHair[avatarBase.hairColor][avatarBase.facialHair]
        }
        zIndex={zIndex + 5}
      />
      <AvatarLayer
        source={AVATAR_BASE.glasses[avatarBase.glasses]}
        zIndex={zIndex + 6}
      />
    </View>
  );
}
