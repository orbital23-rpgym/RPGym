import { useRouter, useSegments } from "expo-router";
import { User as FirebaseUser } from "firebase/auth";
import { useEffect } from "react";
import { ViewProps } from "react-native/types";

import { UserContext } from "./UserContext";

import { PLACEHOLDER_USER } from "constants/placeholder-values";
import { useAuthentication } from "library/hooks/useAuthentication";
import { DEBUG_MODE } from "src/init";
import { User } from "src/user/User";

/**
 * Protects the route access based on user authentication.
 */
function useProtectedRoute(authUser?: FirebaseUser, appUser?: User) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    /** Route group for pages accessible to unauthenticated users. */
    const AUTH_GROUP = "(auth)";
    const isInAuthGroup = segments[0] === AUTH_GROUP;
    const isAuthenticated = authUser || DEBUG_MODE;
    const isUserLoaded = appUser && appUser !== PLACEHOLDER_USER;

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isAuthenticated &&
      !isInAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/welcome");
    } else if (isAuthenticated && isInAuthGroup && isUserLoaded) {
      // Redirect away from the sign-in page.
      if (appUser.isOnboarded) router.replace("/(tabs)/profile");
      else router.replace("/onboarding/");
    }
  }, [authUser, appUser, segments]);
}

export function AuthProvider(props: ViewProps) {
  const {
    authUser,
    // Seems like authenticated pages do not unload when protected route redirects to login page.
    // To avoid crashes, return placeholder user
    appUser = PLACEHOLDER_USER,
    setAppUser,
  } = useAuthentication();

  useProtectedRoute(authUser, appUser);

  return (
    <UserContext.Provider value={{ appUser, setAppUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
