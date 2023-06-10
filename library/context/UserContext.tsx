import { createContext } from "react";
import { User } from "src/user/User";

export const UserContext = createContext<User | undefined>(undefined);
