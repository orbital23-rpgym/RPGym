import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ONBOARDING_IMAGES } from "constants/onboarding";
import { QUEST_DIFFICULTY_EXPLANATION } from "constants/quest";
import { Button } from "library/components/Button";
import { ButtonText, HeadingText } from "library/components/StyledText";
import { Screen, Text } from "library/components/Themed";

export default function QuestDifficultyExplainerModal() {
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      gap: 15,
      width: "100%",
      minHeight: "100%",
      justifyContent: "flex-start",
      paddingHorizontal: 10,
      paddingBottom: insets.top,
    },
    headingText: {
      textAlign: "center",
    },
    image: {
      minHeight: 100,
      width: "100%",
      height: "20%",
      marginVertical: 10,
    },
    explanationText: {
      fontSize: 17,
      lineHeight: 28,
    },
    button: {},
  });
  return (
    <Screen noTabBar>
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerTitle: "Quest Difficulty",
          headerTransparent: false,
        }}
      />
      <View style={styles.container}>
        <HeadingText style={styles.headingText}>
          {"Why do I need to choose a difficulty?"}
        </HeadingText>
        <Image
          source={ONBOARDING_IMAGES.jimbro.calendarRight}
          style={styles.image}
          contentFit="contain"
          contentPosition="center"
        />
        <Text style={styles.explanationText}>
          {QUEST_DIFFICULTY_EXPLANATION}
        </Text>
        <Button
          onPress={() => router.push("../")}
          style={styles.button}
          variant="secondary"
        >
          <ButtonText>{"Got it!"}</ButtonText>
        </Button>
      </View>
    </Screen>
  );
}
