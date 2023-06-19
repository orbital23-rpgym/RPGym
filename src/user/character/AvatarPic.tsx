import { Image } from "expo-image";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { UserCharacter } from "./UserCharacter";

import LoadingScreen from "library/components/LoadingScreen";
import { ProgressBarWithLabels } from "library/components/ProgressBar";
import {
  Text,
  useThemeColor,
  View,
  ViewProps,
} from "library/components/Themed";
import { UserContext } from "library/context/UserContext";
import { useAuthentication } from "library/hooks/useAuthentication";
import { db } from "src/firebase-init";
import Avatar from "src/rpg/avatar/Avatar";

type AvatarProps = {
  avatar: Avatar;
} & ViewProps;

export default function AvatarPic(props: AvatarProps) {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: useThemeColor({}, "green"),
      flex: 1,
      width: "100%",
      height: "100%",
    },
  });

  const avatar = props.avatar;

  return (
    <View style={styles.container}>
      {/* <Image
        source={images.logo.white}
        accessibilityLabel="RPGym Logo"
        style={styles.logo}
        contentFit="contain" /> */}
      <Text>AVATAR</Text>
    </View>
  );
}
