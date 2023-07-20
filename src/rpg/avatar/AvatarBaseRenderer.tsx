import { StyleSheet } from "react-native";

import { AVATAR_BASE_ONBODY } from "./avatar-images";
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
        source={
          AVATAR_BASE_ONBODY.base[avatarBase.bodySize][avatarBase.skinColor]
        }
      />
      <AvatarLayer
        source={AVATAR_BASE_ONBODY.base[avatarBase.bodySize].clothes}
      />
      <AvatarLayer
        source={
          AVATAR_BASE_ONBODY.backHair[avatarBase.hairColor][avatarBase.backHair]
        }
      />
      <AvatarLayer
        source={
          AVATAR_BASE_ONBODY.frontHair[avatarBase.hairColor][
            avatarBase.frontHair
          ]
        }
      />
      <AvatarLayer
        source={
          AVATAR_BASE_ONBODY.faceHair[avatarBase.hairColor][
            avatarBase.facialHair
          ]
        }
      />
      <AvatarLayer source={AVATAR_BASE_ONBODY.glasses[avatarBase.glasses]} />
    </View>
  );
}
