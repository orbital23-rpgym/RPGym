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

  const syncUserDataFromWeb = () => {
    if (authUser) {
      User.fromId(authUser.uid)
        .then((user) => setAppUser(user))
        .catch((reason) => {
          // sometimes it tries to sync right after signup which doesn't work
          // for now, ignore the error
        });
    } else {
      setAppUser(undefined);
    }
  };

  const getUserDataFromLocalStorage = async () => {
    const jsonValue = await AsyncStorage.getItem("user-data");
    return jsonValue != null ? (JSON.parse(jsonValue) as User) : null;
  };

  const saveUserDataToLocalStorage = async (user: User | undefined) => {
    // Don't save if appUser is placeholder
    if (user === PLACEHOLDER_USER) return;
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
          // User is signed in
          setAuthUser(user);
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
          if (authUser && user && user.id === authUser.uid) {
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
  }, []);

  useEffect(() => {
    if (!authUser) {
      // debug mode override
      if (DEBUG_MODE) {
        setAppUser(DUMMY_USER);
        return;
      }
      setAppUser(undefined);
    } else {
      // Update app user instance
      const isAppAndAuthUserMismatched =
        authUser && appUser && appUser.id !== authUser.uid;
      const hasAuthButNoApp = authUser && !appUser;
      if (!DEBUG_MODE && (isAppAndAuthUserMismatched || hasAuthButNoApp))
        syncUserDataFromWeb();
    }
  }, [authUser]);

  useEffect(() => {
    // Any modifications to appUser should have already triggered firebase update
    saveUserDataToLocalStorage(appUser);
  }, [appUser]);

  return { authUser, appUser, setAppUser };
}
