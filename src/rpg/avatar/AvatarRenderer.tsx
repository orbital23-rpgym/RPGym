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
  baseOnly?: boolean;
  transparentBg?: boolean;
} & Omit<ViewProps, "children">;

export default function AvatarRenderer(props: AvatarProps) {
  const {
    avatar,
    style,
    mini: isMini = false,
    baseOnly: isBaseOnly = false,
    transparentBg: hasTransparentBackground = false,
    ...otherProps
  } = props;
  const spriteLayerDynamicStyles = isMini
    ? {
        width: "200%" as const,
        height: "200%" as const,
        marginTop: "110%" as const,
      }
    : {
        width: "100%" as const,
        height: "100%" as const,
      };
  const containerDynamicStyles = isMini
    ? { borderRadius: 10000, width: 65, height: 65 }
    : {
        width: "100%" as const,
        height: "100%" as const,
      };
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      flex: 1,
      aspectRatio: 1,
      overflow: "hidden",
      backgroundColor: hasTransparentBackground
        ? palette.transparent
        : avatar.avatarBase.background,
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
        {!isBaseOnly && (
          <AvatarEquipmentRenderer avatarEquipment={avatar.avatarEquipment} />
        )}
      </View>
    </View>
  );
}
