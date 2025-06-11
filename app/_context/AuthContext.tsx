import { AuthContextType } from "@/lib/types";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType>({
    user: null,
});