import React from "react";
import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LogoutLink from "./LogoutLink";

const UserContext = createContext({});

interface User {
  email: string;
}

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  let emptyuser: User = { email: "" };
  const navigate = useNavigate();
  const [user, setUser] = useState(emptyuser);

  useEffect(() => {
    const fetchWithRetry = async () => {
      const res = await fetch("http://localhost:5031/pingauth", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      });

      if (res.status === 200) {
        const data = await res.json();
        setUser({ email: data.email });
        setAuthorized(true);
        setLoading(false);
      }
    };

    fetchWithRetry();
  }, []);

  if (loading) {
    return (
      <div>
        <a href="/log-in">Log in</a> | <a href="/sign-in">Sign up</a>
      </div>
    );
  } else {
    if (authorized && !loading) {
      return (
        <>
          <UserContext.Provider value={user}>
            {props.children}
          </UserContext.Provider>
        </>
      );
    } else {
      return (
        <>
          <Navigate to="/log-in" />
        </>
      );
    }
  }
}

export function AuthorizedUser(props: { value: string }) {
  const user: any = React.useContext(UserContext);

  if (props.value == "email") return <>{user.email}</>;
  else
    return (
      <div>
        <a href="/log-in">Log in</a> | <a href="/sign-in">Sign up</a>
      </div>
    );
}

export default AuthorizeView;
