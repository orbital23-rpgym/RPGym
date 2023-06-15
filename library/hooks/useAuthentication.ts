import { useEffect, useState } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { User } from "src/user/User";
import { auth } from "src/firebase-init";

export function useAuthentication() {
  const [authUser, setAuthUser] = useState<FirebaseUser | undefined>(undefined);
  const [appUser, setAppUser] = useState<User | undefined>(undefined);

  useEffect(() => {
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
          setAppUser(undefined);
        }
      },
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return { authUser, user: appUser };
}
