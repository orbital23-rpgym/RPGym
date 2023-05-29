import { useRouter, useSegments } from "expo-router";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import React from "react";
import { ViewProps } from "react-native/types";
import { User } from "firebase/auth";

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user?: User) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const isInAuthGroup = segments[0] === "(auth)";

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

  return <>{props.children}</>;
}
