import { useEffect, useState } from "react";
import AuthorizeView, { AuthorizedUser } from "./AuthorizeView";
import LogoutLink from "./LogoutLink";

interface User {
  id: string;
  email: string;
  isLandlord: boolean;
}

const NavBar = () => {
  let loginUser: User = { id: "", email: "", isLandlord: false };
  const [user, setUser] = useState<User>(loginUser);

  useEffect(() => {}, []);
  return (
    <div className="d-flex alert-success py-3 px-3 align-items-center justify-content-between">
      {" "}
      <a className="ps-3 p-2 " href="/">
        <h2>Property Hub</h2>
      </a>
      <AuthorizeView>
        <div className=" me-3 ms-auto p-2">
          <AuthorizedUser value="email" />|<LogoutLink>Logout</LogoutLink>
        </div>
      </AuthorizeView>
    </div>
  );
};

export default NavBar;
