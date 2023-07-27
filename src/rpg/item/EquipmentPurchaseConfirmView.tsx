import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Redirect, Stack, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { getItemImageIcon, Item, itemShopPrice } from "./Item";

import { themes } from "constants/colors";
import { fullWidthButton } from "constants/styles";
import { Button } from "library/components/Button";
import { Card } from "library/components/Card";
import { ErrorDisplay } from "library/components/ErrorDisplay";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Screen, Text } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useEquipmentShopContext } from "library/context/EquipmentShopContext";
import { useAppUser } from "library/context/UserContext";

export default function EquipmentPurchaseConfirmView(props: {
  onBuy: (item: Item) => Promise<void>;
  onBuyAndEquip: (item: Item) => Promise<void>;
}) {
  const router = useRouter();
  const user = useAppUser();
  const colorScheme = useContext(ColorSchemeContext);
  const { data, setData } = useEquipmentShopContext();
  const styles = StyleSheet.create({
    infoCard: {
      gap: 15,
      alignItems: "center",
      padding: 10,
    },
    itemIconContainer: {
      aspectRatio: 1,
      minHeight: 150,
      maxHeight: 200,
      overflow: "hidden",
      backgroundColor: themes[colorScheme].background,
      borderRadius: 20,
    },
    itemIconImage: {
      flex: 1,
      overflow: "hidden",
    },
    itemNameText: {
      fontFamily: "Header",
      fontSize: 22,
    },
    priceContainer: {
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 8,
    },
    priceText: {
      fontFamily: "Header",
      fontSize: 20,
    },
  });
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function buy() {
    setIsSubmitting(true);
    setError(undefined);
    props
      .onBuy(data)
      .then(() => {
        setIsSubmitting(false);
        router.push("/equipment/shop");
      })
      .catch((reason) => {
        setError(reason);
      })
      .finally(() => setIsSubmitting(false));
  }

  function buyAndEquip() {
    setIsSubmitting(true);
    setError(undefined);
    props
      .onBuyAndEquip(data)
      .then(() => {
        setIsSubmitting(false);
        router.push("/(tabs)/profile");
      })
      .catch((reason) => {
        setError(reason);
      })
      .finally(() => setIsSubmitting(false));
  }

  return data.material === "none" ? (
    <Redirect href="/equipment/shop" />
  ) : (
    <Screen>
      <Stack.Screen
        options={{
          headerTitle: "Purchase",
          headerRight: () => (
            <View style={styles.priceContainer}>
              <FontAwesome5
                name="coins"
                size={20}
                color={themes[colorScheme].orange}
              />
              <Text style={styles.priceText}>{user.character.money}</Text>
            </View>
          ),
        }}
      />
      <Card>
        <View style={styles.infoCard}>
          <HeadingText>{"You are purchasing"}</HeadingText>
          <View style={styles.itemIconContainer}>
            <Image
              source={getItemImageIcon(data)}
              contentFit="contain"
              style={styles.itemIconImage}
            />
          </View>
          <Text style={styles.itemNameText}>{data.name}</Text>
          <View style={styles.priceContainer}>
            <FontAwesome5
              name="coins"
              size={24}
              color={themes[colorScheme].orange}
            />
            <Text style={styles.priceText}>{itemShopPrice(data)}</Text>
          </View>
        </View>
      </Card>

      {error && <ErrorDisplay error={error} />}

      <Button
        style={fullWidthButton.button}
        variant="save"
        disabled={isSubmitting}
        onPress={() => buy()}
      >
        <ButtonText style={fullWidthButton.text}>{"Buy"}</ButtonText>
      </Button>
      <Button
        style={fullWidthButton.button}
        variant="primary"
        disabled={isSubmitting}
        onPress={() => buyAndEquip()}
      >
        <ButtonText style={fullWidthButton.text}>{"Buy & Equip"}</ButtonText>
      </Button>
      <Button
        style={fullWidthButton.button}
        variant="secondary"
        onPress={() => router.back()}
      >
        <ButtonText style={fullWidthButton.text}>{"Back to Shop"}</ButtonText>
      </Button>
    </Screen>
  );
}
