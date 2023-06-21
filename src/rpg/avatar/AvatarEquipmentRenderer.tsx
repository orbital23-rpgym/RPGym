import { StyleSheet } from "react-native";

import { avatarLayerStyles } from "./AvatarLayer";

import { palette } from "constants/colors";
import { View, ViewProps } from "library/components/Themed";
import AvatarEquipment from "src/rpg/avatar/AvatarEquipment";

type AvatarEquipmentProps = {
  avatarEquipment: AvatarEquipment;
} & Omit<ViewProps, "children">;

export default function AvatarEquipmentRenderer(props: AvatarEquipmentProps) {
  const { avatarEquipment } = props;

  return (
    <View style={avatarLayerStyles.layer}>
      {/* <AvatarLayer
        source={
          AVATAR_BASE.faceHair[avatarBase.hairColor][avatarBase.facialHair]
        }
        zIndex={zIndex + 4}
      /> */}
    </View>
  );
}
