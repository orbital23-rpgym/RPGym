import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import AvatarEquipment from "../avatar/AvatarEquipment";

import { Item } from "./Item";

import { themes } from "constants/colors";
import { headingTextStyle } from "constants/styles";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { EquipmentShopContext } from "library/context/EquipmentShopContext";

export default function EquipmentShopStack() {
  const colorScheme = useContext(ColorSchemeContext);
  const router = useRouter();
  const [data, setData] = useState<Item>(
    // temp "none" item
    AvatarEquipment.EMPTY_EQUIPMENT.mainHand,
  );

  return (
    <EquipmentShopContext.Provider value={{ data, setData }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: themes[colorScheme].background,
          },
          headerTitleStyle: {
            ...headingTextStyle,
          },
          headerTintColor: themes[colorScheme].text,
          headerLeft: () => {
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => router.back()}
              >
                <FontAwesome
                  name="chevron-left"
                  size={20}
                  color={themes[colorScheme].text}
                />
              </TouchableOpacity>
            );
          },
        }}
      >
        <Stack.Screen name="shop" options={{ presentation: "card" }} />
        <Stack.Screen name="buy" options={{ presentation: "card" }} />
      </Stack>
    </EquipmentShopContext.Provider>
  );
}
