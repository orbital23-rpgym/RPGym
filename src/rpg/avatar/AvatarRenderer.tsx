import { StyleSheet } from "react-native";

import AvatarBase from "./AvatarBase";
import AvatarBaseRenderer from "./AvatarBaseRenderer";
import AvatarEquipmentRenderer from "./AvatarEquipmentRenderer";

import { palette } from "constants/colors";
import { View, ViewProps } from "library/components/Themed";
import Avatar from "src/rpg/avatar/Avatar";

type AvatarProps = {
  avatar: Avatar;
  mini?: boolean;
} & Omit<ViewProps, "children">;

export default function AvatarRenderer(props: AvatarProps) {
  const { avatar, style, mini: isMini = false, ...otherProps } = props;
  const spriteLayerDynamicStyles = isMini
    ? {
        width: "200%",
        height: "200%",
        marginTop: "110%",
      }
    : {
        width: "100%",
        height: "100%",
      };
  const containerDynamicStyles = isMini
    ? { borderRadius: 10000, width: 65, height: 65 }
    : {
        width: "100%",
        height: "100%",
      };
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: avatar.avatarBase.background,
      padding: 10,
      flex: 1,
      aspectRatio: 1,
      overflow: "hidden",
      ...containerDynamicStyles,
    },
    spriteLayers: {
      backgroundColor: palette.transparent,
      position: "relative",
      ...spriteLayerDynamicStyles,
    },
  });

  return (
    <View style={StyleSheet.compose(styles.container, style)} {...otherProps}>
      <View style={styles.spriteLayers}>
        <AvatarBaseRenderer avatarBase={avatar.avatarBase} />
        <AvatarEquipmentRenderer avatarEquipment={avatar.avatarEquipment} />
      </View>
    </View>
  );
}
