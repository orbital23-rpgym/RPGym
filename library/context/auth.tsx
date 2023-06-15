import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ViewProps } from "react-native/types";

import { UserContext } from "./UserContext";

import { useAuthentication } from "library/hooks/useAuthentication";
import { User } from "src/user/User";

/**
 * Protects the route access based on user authentication.
 */
function useProtectedRoute(user?: User) {
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
      router.replace("/welcome");
    } else if (user && isInAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("(tabs)/");
    }
  }, [user, segments]);
}

export function AuthProvider(props: ViewProps) {
  const { user } = useAuthentication();

  useProtectedRoute(user);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}
