import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { palette, themes } from "constants/colors";
import { dropShadow } from "constants/styles";
import { HeadingText } from "library/components/StyledText";
import { Text, View, ViewProps } from "library/components/Themed";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";
import { useAppUser } from "library/context/UserContext";
import AvatarRenderer from "src/rpg/avatar/AvatarRenderer";

export type TrackingOverviewCardProps = Omit<ViewProps, "children">;
export default function TrackingOverviewCard() {
  const colorScheme = useContext(ColorSchemeContext);
  const router = useRouter();
  const user = useAppUser();
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: themes[colorScheme].cardBackground,
      flex: 1,
      width: "100%",
      flexDirection: "row",
      padding: 15,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 10,
      gap: 15,
      flexWrap: "wrap",
      ...dropShadow(themes[colorScheme].shadowColor),
    },
    avatar: {
      borderRadius: 100,
      maxHeight: 65,
      maxWidth: 65,
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      backgroundColor: palette.transparent,
      flex: 1,
      minWidth: "auto",
      alignContent: "center",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    numWorkouts: {
      fontFamily: "Header",
      fontSize: 20,
      color: themes[colorScheme].textSecondary,
    },
  });
  const [numWorkouts, setNumWorkouts] = useState(0);
  useEffect(() => {
    user.fitnessTracker.numberOfWorkouts().then((numWorkouts) => {
      setNumWorkouts(numWorkouts);
    });
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => router.push("/workout/history")}
      style={styles.container}
    >
      <AvatarRenderer
        mini
        avatar={user.character.avatar}
        style={styles.avatar}
      />
      <View style={styles.content}>
        <HeadingText>{user.character.displayName}</HeadingText>
        <Text style={styles.numWorkouts}>{numWorkouts} workouts</Text>
      </View>
      <FontAwesome5
        name="chevron-right"
        color={themes[colorScheme].text}
        size={30}
      />
    </TouchableOpacity>
  );
}
