import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AvatarOption } from "../edit-profile/EditAvatarBaseCard";

import { Card } from "library/components/Card";
import { Text } from "library/components/Themed";
import { useAppUser } from "library/context/UserContext";
import { getItemImageIcon } from "src/rpg/item/Item";

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
  const avatarEquipment = user.character.avatar.avatarEquipment;
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
            image={getItemImageIcon(avatarEquipment.helmet)}
          />
          <AvatarOption
            label="Chestplate"
            image={getItemImageIcon(avatarEquipment.chestplate)}
          />
          <AvatarOption
            label="Leggings"
            image={getItemImageIcon(avatarEquipment.leggings)}
          />
          <AvatarOption
            label="Boots"
            image={getItemImageIcon(avatarEquipment.boots)}
          />
          <AvatarOption
            label="Main Hand"
            image={getItemImageIcon(avatarEquipment.mainHandItem)}
          />
          <AvatarOption
            label="Off Hand"
            image={getItemImageIcon(avatarEquipment.offHandItem)}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}
