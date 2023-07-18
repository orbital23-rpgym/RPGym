import { Redirect } from "expo-router";
import { useContext } from "react";

import { UserContext } from "library/context/UserContext";

export default function InitialScreen() {
  const hasUser = useContext(UserContext) !== undefined;
  return <Redirect href={hasUser ? "/(tabs)/profile" : "/(auth)/welcome"} />;
}
