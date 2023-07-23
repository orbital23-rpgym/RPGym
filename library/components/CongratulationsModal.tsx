import { Image } from "expo-image";
import { Link, Stack, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, ViewProps } from "react-native";

import { HeadingText } from "./StyledText";
import { Screen } from "./Themed";

import { themes } from "constants/colors";
import { images } from "constants/images";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

export function CongratulationsModal(
  props: { secondaryText?: string } & Pick<ViewProps, "children">,
) {
  const colorScheme = useContext(ColorSchemeContext);
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();
  const styles = StyleSheet.create({
    screen: {
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    stars: {
      minHeight: 150,
      width: "100%",
    },
    congratsText: {},
    secondaryText: {
      color: themes[colorScheme].textSecondary,
      fontSize: 18,
    },
  });
  return (
    <Screen noTabBar style={styles.screen} gap={25}>
      <Stack.Screen
        options={{
          headerTitle: "",
        }}
      />
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}

      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
      <Image source={images.stars} contentFit="contain" style={styles.stars} />
      <HeadingText style={styles.congratsText}>
        {"Congratulations!"}
      </HeadingText>
      {props.secondaryText && (
        <HeadingText style={styles.secondaryText}>
          {props.secondaryText}
        </HeadingText>
      )}
      {props.children}
    </Screen>
  );
}
