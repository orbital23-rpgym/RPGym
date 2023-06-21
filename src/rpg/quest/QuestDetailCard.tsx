import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";

import Quest from "./Quest";

import { palette, themes } from "constants/colors";
import { Card } from "library/components/Card";
import { ButtonText } from "library/components/StyledText";
import { Text, View, ViewProps } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export type QuestDetailCardProps = {
  quest: Quest | null | undefined;
} & Omit<ViewProps, "children">;

export default function QuestDetailCard(props: QuestDetailCardProps) {
  const router = useRouter();
  const { quest, style, ...otherProps } = props;
  const colorScheme = useContext(ColorSchemeContext);
  const styles = StyleSheet.create({
    container: {
      gap: 20,
      flex: 1,
      backgroundColor: palette.transparent,
    },
    lastUsed: {
      color: themes[colorScheme].blueLight,
    },
    exerciseList: {
      width: "100%",
    },
    newQuestButton: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      gap: 10,
      padding: 10,
    },
    pressed: {
      opacity: 0.5,
    },
  });
  const CARD_TITLE = "⚔️ Current Quest";
  return quest ? (
    <Card
      style={style}
      title={CARD_TITLE}
      headerColor={themes[colorScheme].orange}
      {...otherProps}
    >
      <View style={styles.container}>
        <Text style={styles.lastUsed} />

        <Text numberOfLines={3} style={styles.exerciseList}>
          eeee
        </Text>
      </View>
    </Card>
  ) : (
    <Card
      style={style}
      title={CARD_TITLE}
      headerColor={themes[colorScheme].blueLight}
      {...otherProps}
    >
      <View style={styles.container}>
        <Text>There is no ongoing quest.</Text>

        <Pressable
          style={({ pressed }) =>
            pressed
              ? StyleSheet.compose(styles.newQuestButton, styles.pressed)
              : styles.newQuestButton
          }
          onPress={() => router.push("/quest/new")}
        >
          <FontAwesome5
            name="plus"
            size={30}
            color={themes[colorScheme].text}
          />
          <ButtonText>Start a new quest</ButtonText>
        </Pressable>
      </View>
    </Card>
  );
}
