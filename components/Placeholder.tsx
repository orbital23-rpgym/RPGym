import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";

export default function PlaceholderText() {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>PLACEHOLDER</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          This has not been implemented yet
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Header",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
