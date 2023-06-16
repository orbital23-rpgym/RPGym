import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { Text, useThemeColor, ViewProps } from "./Themed";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

type ProgressBarProps = {
  colorFg?: string;
  colorBg?: string;
  max: number;
  curr: number;
} & ViewProps;

export function ProgressBar(props: ProgressBarProps) {
  const colorScheme = useContext(ColorSchemeContext);

  const { colorFg, colorBg, max, curr, ...otherProps } = props;

  const styles = StyleSheet.create({
    container: {
      maxHeight: 6,
      minHeight: 6,
      minWidth: 50,
      width: "100%",
      shadowColor: themes[colorScheme].shadowColor,
      shadowOpacity: 0.5,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
      overflow: "hidden",
      borderRadius: 10000,
      padding: 0,
      flex: 1,
    },
    background: {
      backgroundColor: colorBg ?? themes[colorScheme].cardBackground,
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    innerBar: {
      backgroundColor: colorFg ?? themes[colorScheme].green,
      width: `${(curr / max) * 100}%`,
      borderRadius: 10000,
    },
  });

  return (
    <View style={styles.container} {...otherProps}>
      <View style={styles.background}>
        <View style={styles.innerBar}></View>
      </View>
    </View>
  );
}

type ProgressBarWithLabelsProps = {
  title: string;
  labelPosition: "linear" | "stack";
} & ProgressBarProps;

export function ProgressBarWithLabels(props: ProgressBarWithLabelsProps) {
  const { title, labelPosition, colorFg, colorBg, max, curr, ...otherProps } =
    props;

  const TITLE_FONT = "Header";
  const LABEL_FONT = "BodyRegular";

  const stylesAll = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      maxWidth: 250,
      minHeight: 30,
      width: "100%",
    },
    titleText: {
      fontFamily: TITLE_FONT,
    },
    labelText: {
      fontFamily: LABEL_FONT,
    },
  });

  const stylesLinear = StyleSheet.create({
    container: {
      flexDirection: "row",
      columnGap: 10,
      rowGap: 4,
      flexWrap: "wrap",
      ...stylesAll.container,
    },
    titleText: {
      fontSize: 16,
      ...stylesAll.titleText,
    },
    labelText: {
      fontSize: 13,
      ...stylesAll.labelText,
    },
  });

  const stylesStack = StyleSheet.create({
    containerOuter: {
      flexDirection: "column",
      gap: 4,
      ...stylesAll.container,
    },
    containerText: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    titleText: {
      fontSize: 14,
      textAlign: "left",
      ...stylesAll.titleText,
    },
    labelText: {
      fontSize: 12,
      textAlign: "right",
      ...stylesAll.labelText,
    },
    spacer: {
      flex: 2,
      minWidth: 1,
    },
  });

  switch (labelPosition) {
    case "stack":
      return (
        <View style={stylesStack.containerOuter} {...otherProps}>
          <View style={stylesStack.containerText}>
            <Text style={stylesStack.titleText}>{title}</Text>
            <View style={stylesStack.spacer} />
            <Text style={stylesStack.labelText}>
              {curr}/{max}
            </Text>
          </View>
          <ProgressBar
            colorBg={colorBg}
            colorFg={colorFg}
            max={max}
            curr={curr}
          />
        </View>
      );

    case "linear":
    default:
      return (
        <View style={stylesLinear.container} {...otherProps}>
          <Text style={stylesLinear.titleText}>{title}</Text>
          <ProgressBar
            colorBg={colorBg}
            colorFg={colorFg}
            max={max}
            curr={curr}
          />
          <Text style={stylesLinear.labelText}>
            {curr}/{max}
          </Text>
        </View>
      );
  }
}
