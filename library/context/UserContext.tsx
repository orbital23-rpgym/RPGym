import { createContext, useContext } from "react";

import { DUMMY_USER } from "constants/dummy-values";
import { DEBUG_MODE } from "src/init";
import { User } from "src/user/User";

export const UserContext = createContext<{
  appUser: User | undefined;
  setAppUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}>({
  appUser: undefined,
  setAppUser: () => {
    return;
  },
});

/** Hook to get user from UserContext. Guarantees user is not undefined. */
export const useAppUser = (): User => {
  const user = useContext(UserContext).appUser;
  if (!user) {
    if (DEBUG_MODE) return DUMMY_USER;
    throw new Error("No UserContext.Provider found when calling useAppUser.");
  }
  return user;
};

export const useSetAppUser = (): React.Dispatch<React.SetStateAction<User>> => {
  const { appUser, setAppUser } = useContext(UserContext);
  if (!appUser) {
    // debug mode override
    if (DEBUG_MODE) {
      return () => {
        return;
      };
    }
    throw new Error(
      "No UserContext.Provider found when calling useSetAppUser.",
    );
  }
  return setAppUser as React.Dispatch<React.SetStateAction<User>>;
};
