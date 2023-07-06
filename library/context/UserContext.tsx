import { createContext, useContext } from "react";

import { DUMMY_USER } from "constants/dummy-values";
import { DEBUG_MODE } from "src/init";
import { User } from "src/user/User";

export const UserContext = createContext<User | undefined>(undefined);

/** Hook to use UserContext. Guarantees user is not undefined. */
export const useUserContext = (): User => {
  const user = useContext(UserContext);
  if (!user) {
    if (DEBUG_MODE) return DUMMY_USER;
    throw new Error(
      "No UserContext.Provider found when calling useUserContext.",
    );
  }
  return user;
};
