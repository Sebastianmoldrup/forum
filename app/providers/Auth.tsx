"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { readUser } from "@/utils/supabase/actions/crud";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { success, error } = await readUser();

      if (error) {
        console.error("Error fetching user:", error);
        setAuthenticated(false);
        return;
      }

      setAuthenticated(true);
      console.log("User fetched successfully:", success);
      return;
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
