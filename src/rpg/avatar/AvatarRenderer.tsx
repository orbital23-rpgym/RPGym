import { StyleSheet } from "react-native";

import AvatarBase from "./AvatarBase";
import AvatarBaseRenderer from "./AvatarBaseRenderer";
import AvatarEquipmentRenderer from "./AvatarEquipmentRenderer";

import { palette } from "constants/colors";
import { View, ViewProps } from "library/components/Themed";
import Avatar from "src/rpg/avatar/Avatar";

type AvatarProps = {
  avatar: Avatar;
} & Omit<ViewProps, "children">;

export default function AvatarRenderer(props: AvatarProps) {
  const { avatar, style, ...otherProps } = props;
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
    },
    spriteLayers: {
      backgroundColor: palette.transparent,
      position: "relative",
      width: "100%",
      height: "100%",
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
