import { FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import {
  getItemImageIcon,
  isEqualItems,
  Item,
  itemShopPrice,
  ItemType,
  PURCHASEABLE_ITEMS,
} from "./Item";

import { themes } from "constants/colors";
import { Card } from "library/components/Card";
import { IconGridOption } from "library/components/IconGridOption";
import { Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useAppUser } from "library/context/UserContext";

export type ItemShopCardProps = {
  title?: string;
  itemType: ItemType;
  onPress?: (item: Item) => void;
};
export default function ItemShopCard(props: ItemShopCardProps) {
  const user = useAppUser();
  const colorScheme = useContext(ColorSchemeContext);
  const { itemType, title = itemType, onPress: onSelect } = props;
  const styles = StyleSheet.create({
    optionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    itemPriceContainer: {
      gap: 8,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    priceContainer: {
      flexDirection: "row",
      gap: 6,
    },
    priceText: { fontFamily: "Header" },
    noMoreItemsText: {},
  });
  const character = user.character;
  const alreadyOwnedItems = character.items;
  const filteredItems = PURCHASEABLE_ITEMS.filter(
    (item) =>
      alreadyOwnedItems.find((ownedItem) => isEqualItems(item, ownedItem)) ===
      undefined,
  )
    .filter((item) => item.material !== "none")
    .filter((item) => item.itemType === itemType);

  return (
    <Card title={title}>
      <View style={styles.optionsContainer}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const itemPrice = itemShopPrice(item);
            return (
              <View style={styles.itemPriceContainer} key={index}>
                <IconGridOption
                  image={getItemImageIcon(item)}
                  label={item.name}
                  onPress={() => {
                    onSelect && onSelect(item);
                  }}
                  disabled={itemPrice > character.money}
                />
                <View style={styles.priceContainer}>
                  <FontAwesome5
                    name="coins"
                    size={15}
                    color={themes[colorScheme].orange}
                  />
                  <Text style={styles.priceText}>{itemPrice}</Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={styles.noMoreItemsText}>
            {"Congrats, you've bought out our entire stock!"}
          </Text>
        )}
      </View>
    </Card>
  );
}
