import { getItemImageOnbody } from "../item/Item";

import { AvatarLayer, avatarLayerStyles } from "./AvatarLayer";

import { View, ViewProps } from "library/components/Themed";
import AvatarEquipment from "src/rpg/avatar/AvatarEquipment";

type AvatarEquipmentProps = {
  avatarEquipment: AvatarEquipment;
} & Omit<ViewProps, "children">;

export default function AvatarEquipmentRenderer(props: AvatarEquipmentProps) {
  const { avatarEquipment } = props;

  return (
    <View style={avatarLayerStyles.layer}>
      <AvatarLayer source={getItemImageOnbody(avatarEquipment.helmet)} />
      <AvatarLayer source={getItemImageOnbody(avatarEquipment.chestplate)} />
      <AvatarLayer source={getItemImageOnbody(avatarEquipment.leggings)} />
      <AvatarLayer source={getItemImageOnbody(avatarEquipment.boots)} />
      <AvatarLayer source={getItemImageOnbody(avatarEquipment.mainHand)} />
      <AvatarLayer source={getItemImageOnbody(avatarEquipment.offHand)} />
    </View>
  );
}
