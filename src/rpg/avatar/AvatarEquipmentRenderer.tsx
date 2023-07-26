import { AvatarLayer, avatarLayerStyles } from "./AvatarLayer";

import { AVATAR_EQUIP_ONBODY } from "constants/avatar-equip";
import { View, ViewProps } from "library/components/Themed";
import AvatarEquipment from "src/rpg/avatar/AvatarEquipment";

type AvatarEquipmentProps = {
  avatarEquipment: AvatarEquipment;
} & Omit<ViewProps, "children">;

export default function AvatarEquipmentRenderer(props: AvatarEquipmentProps) {
  const { avatarEquipment } = props;

  return (
    <View style={avatarLayerStyles.layer}>
      <AvatarLayer
        source={
          AVATAR_EQUIP_ONBODY[avatarEquipment.helmet.itemType ?? "helmet"][
            avatarEquipment.helmet.material ?? "none"
          ]
        }
      />
      <AvatarLayer
        source={
          AVATAR_EQUIP_ONBODY[
            avatarEquipment.chestplate.itemType ?? "chestplate"
          ][avatarEquipment.chestplate.material ?? "none"]
        }
      />
      <AvatarLayer
        source={
          AVATAR_EQUIP_ONBODY[avatarEquipment.leggings.itemType ?? "leggings"][
            avatarEquipment.leggings.material ?? "none"
          ]
        }
      />
      <AvatarLayer
        source={
          AVATAR_EQUIP_ONBODY[avatarEquipment.boots.itemType ?? "boots"][
            avatarEquipment.boots.material ?? "none"
          ]
        }
      />
      <AvatarLayer
        source={
          AVATAR_EQUIP_ONBODY[
            avatarEquipment.mainHandItem.itemType ?? "mainHand"
          ][avatarEquipment.mainHandItem.material ?? "none"]
        }
      />
      <AvatarLayer
        source={
          AVATAR_EQUIP_ONBODY[
            avatarEquipment.offHandItem.itemType ?? "offHand"
          ][avatarEquipment.offHandItem.material ?? "none"]
        }
      />
    </View>
  );
}
