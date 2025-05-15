"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "@/utils/supabase/actions/getUser";

const userContext = createContext({});

export function useUser() {
  return useContext(userContext);
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  console.log("user", user);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await getUser();

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      setUser(data);
    };
    fetchUser();
  }, []);

  const value = {};
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
