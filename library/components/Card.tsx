import { useContext } from "react";
import { StyleSheet } from "react-native";

import { Text, View, ViewProps } from "./Themed";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

type CardProps = {
  title?: string;
  headerColor?: string;
} & ViewProps;

export function Card(props: CardProps) {
  const colorScheme = useContext(ColorSchemeContext);

  const styles = StyleSheet.create({
    cardContainer: {
      margin: 10,
      borderRadius: 10,
      backgroundColor: themes[colorScheme].cardBackground,
      shadowColor: themes[colorScheme].shadowColor,
      shadowOpacity: 0.5,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      overflow: "hidden",
      height: "auto",
      minWidth: 100,
      maxWidth: 500,
      width: "100%",
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
      <View style={styles.cardContainer}>
        {headerBar}
        <View style={styles.childContainer}>{props.children}</View>
      </View>
    </>
  );
}
