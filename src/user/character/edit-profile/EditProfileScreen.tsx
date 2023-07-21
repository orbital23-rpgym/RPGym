import { StyleSheet } from "react-native";

import EditProfileController from "./EditProfileController";

import { Screen } from "library/components/Themed";

export default function EditProfileScreen() {
  return (
    <Screen style={styles.container}>
      <EditProfileController />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
