import { StyleSheet } from "react-native";

import AvatarBase from "./AvatarBase";
import AvatarBaseRenderer from "./AvatarBaseRenderer";
import AvatarEquipmentRenderer from "./AvatarEquipmentRenderer";

import { View, ViewProps } from "library/components/Themed";
import Avatar from "src/rpg/avatar/Avatar";

type AvatarProps = {
  avatar: Avatar;
  zIndex?: number;
} & Omit<ViewProps, "children">;

export default function AvatarRenderer(props: AvatarProps) {
  const { avatar, zIndex = 1, style, ...otherProps } = props;
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: avatar.avatarBase.background,
      padding: 10,
      flex: 1,
      aspectRatio: 1,
      width: "100%",
      height: "100%",
      zIndex: zIndex,
    },
  });

  const BaseZIndex = zIndex + 1;
  const EquipZIndex = BaseZIndex + AvatarBase.NUM_LAYERS + 2;

  return (
    <View style={StyleSheet.compose(styles.container, style)} {...otherProps}>
      <AvatarBaseRenderer avatarBase={avatar.avatarBase} zIndex={BaseZIndex} />
      <AvatarEquipmentRenderer
        avatarEquipment={avatar.avatarEquipment}
        zIndex={EquipZIndex}
      />
    </View>
  );
}
