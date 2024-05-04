import axios, { AxiosResponse } from "axios";
import React from "react";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext({});

interface User {
  email: string;
}

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  let emptyuser: User = { email: "" };

  const [user, setUser] = useState(emptyuser);

  useEffect(() => {
    let retryCount = 0;
    let maxRetries = 3;
    let delay: number = 1000;

    function wait(delay: number) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }

    async function fetchWithRetry() {
      try {
        const res: AxiosResponse = await axios.get(
          "http://localhost:5031/pingauth"
        );

        if (res.status === 200) {
          setUser({ email: res.config.data.email });
          setAuthorized(true);
          console.log(res);
          return res;
        } else if (res.status === 401) {
          console.log(res);
          return res;
        } else {
          throw new Error("" + res.status);
        }
      } catch (error) {
        retryCount++;
        if (retryCount > maxRetries) {
          throw error;
        } else {
          await wait(delay);
          return fetchWithRetry();
        }
      }
    }

    fetchWithRetry()
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setLoading(false));
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
