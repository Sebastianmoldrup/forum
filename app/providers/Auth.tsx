"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { readUser } from "@/utils/supabase/actions/crud";
import { User } from "@/app/types";

interface AuthContextType {
  authStatus: () => boolean;
  userData: () => User | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
  // return useContext(AuthContext);
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const { success, error, data } = await readUser();

      if (error) {
        console.error("Error fetching user:", error);
        setAuthenticated(false);
        return;
      }

      setUser(data);
      setAuthenticated(true);
      console.log("User fetched successfully:", success);
      return;
    };
    fetchUser();
  }, []);

  const authStatus = (): boolean => {
    return authenticated;
  };

  const userData = (): User | undefined => {
    return user;
  };

  const values = {
    authStatus,
    userData,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
