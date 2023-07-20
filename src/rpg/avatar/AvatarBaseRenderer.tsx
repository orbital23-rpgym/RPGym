import { StyleSheet } from "react-native";

import { AVATAR_BASE } from "./avatar-images";
import { AvatarLayer, avatarLayerStyles } from "./AvatarLayer";

import { palette } from "constants/colors";
import { View } from "library/components/Themed";
import AvatarBase from "src/rpg/avatar/AvatarBase";

type AvatarBaseProps = {
  avatarBase: AvatarBase;
};

export default function AvatarBaseRenderer(props: AvatarBaseProps) {
  const { avatarBase } = props;
  return (
    <View style={avatarLayerStyles.layer}>
      <AvatarLayer
        source={AVATAR_BASE.base[avatarBase.bodySize][avatarBase.skinColor]}
      />
      <AvatarLayer source={AVATAR_BASE.base[avatarBase.bodySize].clothes} />
      <AvatarLayer
        source={AVATAR_BASE.backHair[avatarBase.hairColor][avatarBase.backHair]}
      />
      <AvatarLayer
        source={
          AVATAR_BASE.frontHair[avatarBase.hairColor][avatarBase.frontHair]
        }
      />
      <AvatarLayer
        source={
          AVATAR_BASE.faceHair[avatarBase.hairColor][avatarBase.facialHair]
        }
      />
      <AvatarLayer source={AVATAR_BASE.glasses[avatarBase.glasses]} />
    </View>
  );
}
