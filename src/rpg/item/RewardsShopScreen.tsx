import { FontAwesome5 } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import AvatarRenderer from "../avatar/AvatarRenderer";

import ItemShopCard from "./ItemShopCard";

import { themes } from "constants/colors";
import { Card } from "library/components/Card";
import { HeadingText } from "library/components/StyledText";
import { Screen, Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useAppUser } from "library/context/UserContext";

export default function RewardsShopScreen() {
  const user = useAppUser();

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
      <ItemShopCard itemType="helmet" title="Helmets" />
      <ItemShopCard itemType="chestplate" title="Chestplate" />
      <ItemShopCard itemType="leggings" title="Leggings" />
      <ItemShopCard itemType="boots" title="Boots" />
      <ItemShopCard itemType="mainHand" title="Main Hand" />
      <ItemShopCard itemType="offHand" title="Secondary Hand" />
    </Screen>
  );
}
