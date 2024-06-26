import React from "react";
import { createContext, useState } from "react";

type User = {
  email: string;
  userRole: string;
  id: string;
};

type TUserContext = {
  fetchUser: () => Promise<any>;
  authorized: boolean;
  isLoading: boolean;
  details: User;
};

const UserContext = createContext<TUserContext | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let emptyUser: User = { email: "", userRole: "", id: "" };
  const [details, setDetails] = useState(emptyUser);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5031/pingauth", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        credentials: "include",
      });

      if (res.status !== 200) return;
      const data = await res.json();

      // console.log(data);

      setDetails({
        email: data.email,
        userRole: data.userRole,
        id: data.id,
      });
      setAuthorized(true);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ fetchUser, authorized, isLoading, details }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserProvider;
