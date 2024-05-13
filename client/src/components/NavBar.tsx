import { useEffect, useState } from "react";
import AuthorizeView, { AuthorizedUser } from "./AuthorizeView";
import LogoutLink from "./LogoutLink";

interface User {
  id: string;
  email: string;
  userRole: string;
}

const NavBar = () => {
  let loginUser: User = { id: "", email: "", userRole: "" };
  const [user, setUser] = useState<User>(loginUser);

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

        setUser({ email: data.email, userRole: data.userRole, id: data.id });
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="d-flex alert-success py-3 px-3 align-items-center justify-content-between">
      {" "}
      <a className="ps-3 p-2 " href="/">
        <h2>Property Hub</h2>
      </a>
      {user.userRole === "tenant" ? (
        <>
          <a className="ps-3 p-2 " href="/mysaved">
            <h3 className="mb-0">My Saved</h3>
          </a>
        </>
      ) : (
        <>
          {user.userRole === "landlord" ? (
            <>
              {" "}
              <a className="ps-3 p-2 " href="/myproperty">
                <h3 className="mb-0">My Property</h3>
              </a>
            </>
          ) : null}
        </>
      )}
      <AuthorizeView>
        <div className=" me-3 ms-auto p-2">
          <AuthorizedUser value="email" />|<LogoutLink>Logout</LogoutLink>
        </div>
      </AuthorizeView>
    </div>
  );
};

export default NavBar;
