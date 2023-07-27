import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import AvatarRenderer from "../avatar/AvatarRenderer";

import { Item } from "./Item";
import ItemShopCard from "./ItemShopCard";

import { themes } from "constants/colors";
import { Card } from "library/components/Card";
import { HeadingText } from "library/components/StyledText";
import { Screen, Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useEquipmentShopContext } from "library/context/EquipmentShopContext";
import { useAppUser } from "library/context/UserContext";

export default function RewardsShopScreen() {
  const user = useAppUser();
  const { data, setData } = useEquipmentShopContext();
  const router = useRouter();
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    introText: {
      fontFamily: "Header",
      fontSize: 17,
    },
    overviewContainer: {
      width: "100%",
      flexDirection: "row",
      gap: 20,
      alignContent: "center",
      alignItems: "center",
    },
    avatarContainer: {
      borderRadius: 10,
      aspectRatio: 1,
      flex: 1,
      overflow: "hidden",
    },
    infoPanel: {
      flex: 1,
      flexDirection: "column",
      gap: 10,
    },
    levelCoinsContainer: {
      flexDirection: "row",
      gap: 5,
      alignContent: "center",
      alignItems: "center",
    },
    levelCoinsText: {
      fontFamily: "Header",
      fontSize: 20,
    },
  });

  function selectItem(item: Item) {
    setData(item);
    router.push("/equipment/buy");
  }
  return (
    <Screen>
      <Stack.Screen options={{ headerTitle: "Rewards Shop" }} />
      <Card>
        <View style={styles.overviewContainer}>
          <View style={styles.avatarContainer}>
            <AvatarRenderer avatar={user.character.avatar} />
          </View>
          <View style={styles.infoPanel}>
            <HeadingText>{user.character.displayName}</HeadingText>
            <View style={styles.levelCoinsContainer}>
              <FontAwesome5
                name="coins"
                size={22}
                color={themes[colorScheme].orange}
              />
              <Text style={styles.levelCoinsText}>
                {user.character.money.toFixed(0)} coins
              </Text>
            </View>
          </View>
        </View>
      </Card>
      <Card>
        <Text style={styles.introText}>
          {
            "Welcome to the Rewards Shop! Here, you can trade your hard-earned coins for shiny new items to make your avatar look cooler and show off the fruits of your labour!"
          }
        </Text>
      </Card>
      <ItemShopCard itemType="helmet" title="Helmets" onPress={selectItem} />
      <ItemShopCard
        itemType="chestplate"
        title="Chestplate"
        onPress={selectItem}
      />
      <ItemShopCard itemType="leggings" title="Leggings" onPress={selectItem} />
      <ItemShopCard itemType="boots" title="Boots" onPress={selectItem} />
      <ItemShopCard
        itemType="mainHand"
        title="Main Hand"
        onPress={selectItem}
      />
      <ItemShopCard
        itemType="offHand"
        title="Secondary Hand"
        onPress={selectItem}
      />
    </Screen>
  );
}
