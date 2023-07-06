import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { DUMMY_USER } from "constants/dummy-values";
import { auth } from "src/firebase-init";
import { DEBUG_MODE } from "src/init";
import { User } from "src/user/User";

export function useAuthentication() {
  const [authUser, setAuthUser] = useState<FirebaseUser | undefined>(undefined);
  const [appUser, setAppUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (DEBUG_MODE) {
      setAppUser(DUMMY_USER);
      return;
    }
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setAuthUser(user);
          // Different user id signed in; update user instance
          // TODO: Seems to be requesting multiple times per reload
          // is there a way to make sure it only requests once?
          if (appUser === undefined || appUser.id !== user.uid)
            User.fromId(user.uid).then((user) => setAppUser(user));
        } else {
          // User is signed out
          setAuthUser(undefined);
          // authenticated pages do not unload when protected route redirects to login page
          // for now to avoid crashes, return dummy user
          setAppUser(DUMMY_USER);
        }
      },
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return { authUser, appUser };
}
