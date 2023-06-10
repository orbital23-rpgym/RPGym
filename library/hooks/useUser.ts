import { useEffect, useState } from "react";
import { useAuthentication } from "./useAuthentication";
import { User } from "src/user/User";

export function useUser() {
  const [user, setUser] = useState<User>();
  const { authUser } = useAuthentication();

  useEffect(() => {
    if (authUser !== undefined) {
      // Different user id signed in; update user instance
      if (user === undefined || user.id !== authUser.uid)
        User.fromId(authUser.uid).then((user) => setUser(user));
    } else {
      // User is signed out
      setUser(undefined);
    }
  }, []);

  return { user };
}
