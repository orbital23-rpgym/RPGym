import { createContext, useContext } from "react";

import { User } from "src/user/User";

export const UserContext = createContext<User | undefined>(undefined);

/** Hook to use UserContext. Guarantees user is not undefined. */
export const useUserContext = () => {
  const user = useContext(UserContext);
  if (!user)
    throw new Error(
      "No UserContext.Provider found when calling useGridItemContext.",
    );
  return user;
};
