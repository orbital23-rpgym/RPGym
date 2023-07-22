import { Link, Stack, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";

import PlaceholderText from "library/components/Placeholder";
import { Screen } from "library/components/Themed";

export function RestTimerModal() {
  const navigation = useNavigation();
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = navigation.canGoBack();

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTitle: "Rest Timer",
        }}
      />
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}

      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
      <PlaceholderText />
    </Screen>
  );
}

export function RestTimerButton() {
  // const [started];
}
