import { useContext } from "react";
import { StyleSheet } from "react-native";

import { Text, View, ViewProps } from "./Themed";

import { themes } from "constants/colors";
import { dropShadow } from "constants/styles";
import { MAX_ELEMENT_WIDTH } from "constants/ui";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

type CardProps = {
  title?: string;
  headerColor?: string;
} & ViewProps;

export function Card(props: CardProps) {
  const colorScheme = useContext(ColorSchemeContext);

  const styles = StyleSheet.create({
    cardContainer: {
      borderRadius: 10,
      backgroundColor: themes[colorScheme].cardBackground,
      overflow: "hidden",
      height: "auto",
      minWidth: 100,
      maxWidth: MAX_ELEMENT_WIDTH,
      width: "100%",
      ...dropShadow(themes[colorScheme].shadowColor),
    },
    titleText: {
      fontFamily: "Header",
      fontSize: 20,
    },
    titleBar: {
      backgroundColor: props.headerColor ?? themes[colorScheme].blueLight,
      top: 0,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      height: "auto",
    },
    childContainer: {
      padding: 20,
      paddingTop: 12,
      paddingBottom: 15,
      height: "auto",
      backgroundColor: themes[colorScheme].cardBackground,
    },
  });

  const headerBar = props.title ? (
    <View style={styles.titleBar}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  ) : (
    <></>
  );
  return (
    <>
      <View
        style={StyleSheet.flatten([{ ...styles.cardContainer }, props.style])}
      >
        {headerBar}
        <View style={styles.childContainer}>{props.children}</View>
      </View>
    </>
  );
}
