import { StyleSheet } from "react-native";

import { palette } from "constants/colors";
import { View, ViewProps } from "library/components/Themed";
import AvatarEquipment from "src/rpg/avatar/AvatarEquipment";

type AvatarEquipmentProps = {
  avatarEquipment: AvatarEquipment;
  zIndex: number;
} & Omit<ViewProps, "children">;

export default function AvatarEquipmentRenderer(props: AvatarEquipmentProps) {
  const { avatarEquipment, zIndex } = props;
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.transparent,
      flex: 1,
      aspectRatio: 1,
      width: "100%",
      height: "100%",
      zIndex: 100,
      position: "absolute",
    },
  });

  return (
    <View style={styles.container}>
      {/* <AvatarLayer
        source={
          AVATAR_BASE.faceHair[avatarBase.hairColor][avatarBase.facialHair]
        }
        zIndex={zIndex + 4}
      /> */}
    </View>
  );
}
