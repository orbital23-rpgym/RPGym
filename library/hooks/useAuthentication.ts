import { useEffect, useState } from "react";

import {
  User as FirebaseUser,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth();

export function useAuthentication() {
  const [authUser, setAuthUser] = useState<FirebaseUser>();

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setAuthUser(user);
          //User.fromId(authUser.uid).then((user) => setUser(user));
        } else {
          // User is signed out
          setAuthUser(undefined);
        }
      },
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return { authUser };
}
