import { Redirect } from "expo-router";
import { useContext } from "react";

import { UserContext } from "library/context/UserContext";

export default function InitialScreen() {
  const user = useContext(UserContext).appUser;
  if (user) {
    if (user.isOnboarded) {
      return <Redirect href="/(tabs)/profile" />;
    } else {
      return <Redirect href="/onboarding/" />;
    }
  } else {
    return <Redirect href="/(auth)/welcome" />;
  }
}
