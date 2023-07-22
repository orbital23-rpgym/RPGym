import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

import { PLACEHOLDER_USER } from "constants/placeholder-values";
import LoadingScreen from "library/components/LoadingScreen";
import { UserContext } from "library/context/UserContext";

export default function InitialScreen() {
  const { appUser: user } = useContext(UserContext);
  if (user) {
    if (user === PLACEHOLDER_USER) {
      return (
        <>
          <Stack.Screen options={{ headerTitle: "" }} />
          <LoadingScreen />
        </>
      );
    } else if (user.isOnboarded) {
      return <Redirect href="/(tabs)/profile" />;
    } else {
      return <Redirect href="/onboarding/" />;
    }
  } else {
    return <Redirect href="/(auth)/welcome" />;
  }
}
