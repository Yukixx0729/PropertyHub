import React from "react";
import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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
      } else {
        navigate("/log-in");
        throw new Error("" + res.status);
      }
    };

    fetchWithRetry();
  }, []);

  if (loading) {
    return (
      <>
        <p>loading....</p>
      </>
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
  else return <></>;
}

export default AuthorizeView;
