import React from "react";
import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const UserContext = createContext({});

interface User {
  email: string;
  userRole: string;
  id: string;
}

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  let emptyuser: User = { email: "", userRole: "", id: "" };
  const [user, setUser] = useState(emptyuser);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:5031/pingauth", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setUser({ email: data.email, userRole: data.userRole, id: data.id });
        setAuthorized(true);
        setLoading(false);
      }
    };

    fetchUser();
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
