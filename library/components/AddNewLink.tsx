import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";
import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

import { ButtonText } from "./StyledText";
import { ViewProps } from "./Themed";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type AddNewLinkProps = {
  text: string;
} & Omit<ViewProps, "children"> &
  Pick<LinkProps, "href">;
export function AddNewLink(props: AddNewLinkProps) {
  const router = useRouter();
  const { text, style, href, ...otherProps } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    addNewLink: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      gap: 10,
      padding: 10,
      marginTop: 10,
    },
    pressed: {
      opacity: 0.6,
    },
  });
  const newStyle = StyleSheet.compose(styles.addNewLink, style);
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? StyleSheet.compose(newStyle, styles.pressed) : newStyle
      }
      onPress={() => router.push(href)}
    >
      <FontAwesome5 name="plus" size={30} color={themes[colorScheme].text} />
      <ButtonText>{text}</ButtonText>
    </Pressable>
  );
}
