import { useRouter, useSegments } from "expo-router";
import { User as FirebaseUser } from "firebase/auth";
import { useEffect } from "react";
import { ViewProps } from "react-native/types";

import { UserContext } from "./UserContext";

import { useAuthentication } from "library/hooks/useAuthentication";

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

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !isInAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/welcome");
    } else if (user && isInAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(tabs)/profile");
    }
  }, [user, segments]);
}

export function AuthProvider(props: ViewProps) {
  const authResult = useAuthentication();

  useProtectedRoute(authResult.authUser);

  return (
    <UserContext.Provider value={authResult.appUser}>
      {props.children}
    </UserContext.Provider>
  );
}
