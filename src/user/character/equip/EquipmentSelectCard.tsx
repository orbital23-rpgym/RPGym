import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { AvatarOption } from "../edit-profile/EditAvatarBaseCard";

import { Card } from "library/components/Card";
import AvatarEquipment from "src/rpg/avatar/AvatarEquipment";
import {
  getItemImageIcon,
  isEqualItems,
  Item,
  ItemType,
} from "src/rpg/item/Item";

export type EquipmentSelectCardProps = {
  title?: string;
  items: Item[];
  itemType: ItemType;
  selectedItem?: Item;
  onSelect?: (item: Item) => void;
};
export default function EquipmentSelectCard(props: EquipmentSelectCardProps) {
  const { items, itemType, title = itemType, onSelect, selectedItem } = props;
  const [selected, setSelected] = useState(0);
  const styles = StyleSheet.create({
    optionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  const filteredItems = [AvatarEquipment.EMPTY_EQUIPMENT[itemType]].concat(
    items.filter((item) => item.itemType === itemType),
  );

  useEffect(() => {
    const foundIndex =
      selectedItem &&
      filteredItems.findIndex((item) => isEqualItems(selectedItem, item));
    if (foundIndex && foundIndex > -1) setSelected(foundIndex);
    else setSelected(0); // select the "none" item
  }, [selectedItem]);

  return (
    <Card title={title}>
      <View style={styles.optionsContainer}>
        {filteredItems.map((item, index) => (
          <AvatarOption
            key={index}
            image={getItemImageIcon(item)}
            selected={index === selected}
            onPress={() => {
              setSelected(index);
              onSelect && onSelect(item);
            }}
          />
        ))}
      </View>
    </Card>
  );
}
