import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { Text, ViewProps } from "./Themed";

import { themes } from "constants/colors";
import { ColorSchemeContext } from "library/context/ColorSchemeContext";

type ProgressBarProps = {
  colorFg?: string;
  colorBg?: string;
  max: number;
  curr: number;
} & Omit<ViewProps, "children">;

export function ProgressBar(props: ProgressBarProps) {
  const colorScheme = useContext(ColorSchemeContext);

  const { colorFg, colorBg, max, curr, style, ...otherProps } = props;

  const styles = StyleSheet.create({
    container: {
      maxHeight: 6,
      minHeight: 6,
      minWidth: 50,
      width: "100%",
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
    <View style={StyleSheet.flatten([styles.container, style])} {...otherProps}>
      <View style={styles.background}>
        <View style={styles.innerBar} />
      </View>
    </View>
  );
}

type ProgressBarWithLabelsProps = {
  title: string;
  labelPosition: "linear" | "stack";
} & ProgressBarProps;

export function ProgressBarWithLabels(props: ProgressBarWithLabelsProps) {
  const {
    title,
    labelPosition,
    colorFg,
    colorBg,
    max,
    curr,
    style,
    ...otherProps
  } = props;

  const TITLE_FONT = "Header";
  const LABEL_FONT = "BodyRegular";

  const stylesAll = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      height: "auto",
      width: "100%",
    },
    titleText: {
      fontSize: 16,
      fontFamily: TITLE_FONT,
    },
    labelText: {
      fontSize: 14,
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
      ...stylesAll.titleText,
    },
    labelText: {
      ...stylesAll.labelText,
    },
  });

  const stylesStack = StyleSheet.create({
    containerOuter: {
      flexDirection: "column",
      gap: 4,
      minHeight: 30,
      ...stylesAll.container,
    },
    containerText: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      columnGap: 5,
      rowGap: 2,
      flexWrap: "wrap",
    },
    titleText: {
      textAlign: "left",
      ...stylesAll.titleText,
    },
    labelText: {
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
        <View
          style={StyleSheet.flatten([stylesStack.containerOuter, style])}
          {...otherProps}
        >
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
        <View
          style={StyleSheet.flatten([stylesLinear.container])}
          {...otherProps}
        >
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
