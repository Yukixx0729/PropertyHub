import React from "react";
import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let emptyUser: User = { email: "", userRole: "", id: "" };
  const [details, setDetails] = useState(emptyUser);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5031/pingauth", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        credentials: "include",
      });

      if (res.status !== 200) return;
      const data = await res.json();

      console.log(data);

      setDetails({ email: data.email, userRole: data.userRole, id: data.id });
      setAuthorized(true);
      setIsLoading(false);
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

// export function useUser(props: { value: string }) {
//   const user: any = React.useContext(UserContext);

//   if (props.value == "email") return <>{user.email}</>;
//   else
//     return (
//       <div>
//         <a href="/log-in">Log in</a> | <a href="/sign-in">Sign up</a>
//       </div>
//     );
// }

export function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserProvider;
