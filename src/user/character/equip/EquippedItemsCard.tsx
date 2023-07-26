import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AvatarOption } from "../edit-profile/EditAvatarBaseCard";

import { AVATAR_EQUIP_ICONS } from "constants/avatar-equip";
import { Card } from "library/components/Card";
import { Text } from "library/components/Themed";
import { useAppUser } from "library/context/UserContext";

export default function EquippedItemsCard() {
  const router = useRouter();
  const user = useAppUser();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    elementsContainer: {
      width: "100%",
      flexWrap: "wrap",
      gap: 10,
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
  });
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => router.push("/equipment/inventory")}
      style={styles.container}
    >
      <Card title="💪 Equipment">
        <Text>You have currently equipped:</Text>
        <View style={styles.elementsContainer}>
          <AvatarOption
            label="Helmet"
            image={
              AVATAR_EQUIP_ICONS[
                user.character.avatar.avatarEquipment.helmet.itemType ??
                  "helmet"
              ][user.character.avatar.avatarEquipment.helmet.material ?? "none"]
            }
          />
          <AvatarOption
            label="Chestplate"
            image={
              AVATAR_EQUIP_ICONS[
                user.character.avatar.avatarEquipment.chestplate.itemType ??
                  "chestplate"
              ][
                user.character.avatar.avatarEquipment.chestplate.material ??
                  "none"
              ]
            }
          />
          <AvatarOption
            label="Leggings"
            image={
              AVATAR_EQUIP_ICONS[
                user.character.avatar.avatarEquipment.leggings.itemType ??
                  "leggings"
              ][
                user.character.avatar.avatarEquipment.leggings.material ??
                  "none"
              ]
            }
          />
          <AvatarOption
            label="Boots"
            image={
              AVATAR_EQUIP_ICONS[
                user.character.avatar.avatarEquipment.boots.itemType ?? "boots"
              ][user.character.avatar.avatarEquipment.boots.material ?? "none"]
            }
          />
          <AvatarOption
            label="Main Hand"
            image={
              AVATAR_EQUIP_ICONS[
                user.character.avatar.avatarEquipment.mainHandItem.itemType ??
                  "mainHand"
              ][
                user.character.avatar.avatarEquipment.mainHandItem.material ??
                  "none"
              ]
            }
          />
          <AvatarOption
            label="Off Hand"
            image={
              AVATAR_EQUIP_ICONS[
                user.character.avatar.avatarEquipment.offHandItem.itemType ??
                  "offHand"
              ][
                user.character.avatar.avatarEquipment.offHandItem.material ??
                  "none"
              ]
            }
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}
