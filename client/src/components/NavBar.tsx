import { useUser } from "./AuthorizeView";
import LogoutLink from "./LogoutLink";

const RoleLink = ({ role }: { role: string }) => {
  const roleMap = {
    tenant: {
      link: ["/mysaved", "/recent"],
      text: ["My Saved", "Latest Properties"],
    },
    landlord: {
      link: ["/myproperty", "/mysaved", "/recent"],
      text: ["My Properties", "My Saved", "Latest Properties"],
    },
  } as Record<string, any>;

  if (!role || !roleMap[role]) return;

  return (
    <>
      {roleMap[role].link.map((link: string, index: number) => (
        <li className="nav-item" key={index}>
          <a className="ps-4 p-2 nav-link" href={link}>
            <h4 className="mb-0">{roleMap[role].text[index]}</h4>
          </a>
        </li>
      ))}
    </>
  );
};

const NavBar = () => {
  const user = useUser();
  const { email, userRole } = user.details ?? {};

  if (!user) {
    console.log("No user");
  }

  return (
    <nav className="navbar navbar-expand-lg alert-success">
      <div className="container-fluid py-3 px-3 ">
        {" "}
        <a className="ps-3 p-2 navbar-brand" href="/">
          <h2>Property Hub</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {user.authorized && (
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {" "}
              <RoleLink role={userRole} />
            </ul>

            <div className="nav-item ms-4">
              <span>{email}</span>
              <LogoutLink> Logout</LogoutLink>
            </div>
          </div>
        )}
        {!user.authorized && (
          <div className=" nav-item">
            <a href="/log-in" className="btn btn-light">
              Log in
            </a>{" "}
            <a href="/sign-up" className="btn btn-primary">
              Sign up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
