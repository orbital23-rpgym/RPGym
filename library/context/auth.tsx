import { useRouter, useSegments } from "expo-router";
import { User as FirebaseUser } from "firebase/auth";
import { useEffect } from "react";
import { ViewProps } from "react-native/types";

import { UserContext } from "./UserContext";

import { PLACEHOLDER_USER } from "constants/placeholder-values";
import { useAuthentication } from "library/hooks/useAuthentication";
import { DEBUG_MODE } from "src/init";

/**
 * Protects the route access based on user authentication.
 */
function useProtectedRoute(user?: FirebaseUser) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    /** Route group for pages accessible to unauthenticated users. */
    const AUTH_GROUP = "(auth)";
    const isInAuthGroup = segments[0] === AUTH_GROUP;

    const isAuthenticated = user || DEBUG_MODE;

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isAuthenticated &&
      !isInAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/welcome");
    } else if (isAuthenticated && isInAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(tabs)/profile");
    }
  }, [user, segments]);
}

export function AuthProvider(props: ViewProps) {
  const {
    authUser,
    appUser = PLACEHOLDER_USER,
    setAppUser,
  } = useAuthentication();

  useProtectedRoute(authUser);

  return (
    <UserContext.Provider value={{ appUser, setAppUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
