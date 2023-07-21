import AsyncStorage from "@react-native-async-storage/async-storage";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { DUMMY_USER } from "constants/dummy-values";
import { PLACEHOLDER_USER } from "constants/placeholder-values";
import { auth } from "src/firebase-init";
import { DEBUG_MODE } from "src/init";
import { User } from "src/user/User";

export function useAuthentication() {
  const [authUser, setAuthUser] = useState<FirebaseUser | undefined>(undefined);
  const [appUser, setAppUser] = useState<User | undefined>(undefined);

  const syncUserDataFromWeb = async () => {
    if (authUser) {
      const user = await User.fromId(authUser.uid);
      setAppUser(user);
    } else {
      setAuthUser(undefined);
    }
  };

  const getUserDataFromLocalStorage = async () => {
    const jsonValue = await AsyncStorage.getItem("user-data");
    return jsonValue != null ? (JSON.parse(jsonValue) as User) : null;
  };

  const saveUserDataToLocalStorage = async (user: User | undefined) => {
    try {
      const localUserData = { user: user, lastSavedAt: Date.now() };
      const jsonValue = JSON.stringify(localUserData);
      await AsyncStorage.setItem("user-data", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    // handle firebase auth
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setAuthUser(user);
          // // Different user id signed in; update user instance
          // // TODO: Seems to be requesting multiple times per reload
          // // is there a way to make sure it only requests once?
          // if (appUser === undefined || appUser.id !== user.uid)
          //   User.fromId(user.uid).then((user) => setAppUser(user));
        } else {
          // User is signed out
          setAuthUser(undefined);
        }
      },
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  useEffect(() => {
    // debug mode override
    if (DEBUG_MODE) {
      setAppUser(DUMMY_USER);
      return;
    }

    // handle app user data

    getUserDataFromLocalStorage()
      .then((user) => {
        if (authUser) {
          if (authUser && user && user.id == authUser.uid) {
            // load user data from local storage
            setAppUser(user);
          } else {
            // try get user from web
            syncUserDataFromWeb();
          }
        } else {
          setAuthUser(undefined);
        }
      })
      .catch((error) => {
        // try get user from web
        syncUserDataFromWeb();
      });

    return () => {
      authUser
        ? saveUserDataToLocalStorage(appUser)
        : saveUserDataToLocalStorage(undefined);
    };
  });

  useEffect(() => {
    if (!authUser) {
      // debug mode override
      if (DEBUG_MODE) {
        setAppUser(DUMMY_USER);
        return;
      }
      // Seems like authenticated pages do not unload when protected route redirects to login page.
      // To avoid crashes, return placeholder user
      setAppUser(PLACEHOLDER_USER);
    } else {
      // Different user id signed in; update user instance
      // TODO: Seems to be requesting multiple times per reload
      // is there a way to make sure it only requests once?
      if (!DEBUG_MODE && (appUser === undefined || appUser.id !== authUser.uid))
        syncUserDataFromWeb();
    }
  }, [authUser]);

  useEffect(() => {
    saveUserDataToLocalStorage(appUser);
    if (appUser) {
      // appUser.character.updateToFirestore();
    }
  }, [appUser]);

  return { authUser, appUser, setAppUser };
}
