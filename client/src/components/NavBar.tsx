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
        <a key={index} className="ps-3 p-2" href={link}>
          <h3 className="mb-0">{roleMap[role].text[index]}</h3>
        </a>
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
    <div className="d-flex alert-success py-3 px-3 align-items-center justify-content-between">
      {" "}
      <a className="ps-3 p-2 " href="/">
        <h2>Property Hub</h2>
      </a>
      {user.authorized && (
        <>
          <RoleLink role={userRole} />
          <div className=" me-3 ms-auto p-2">
            <span>{email}</span>
            <LogoutLink> Logout</LogoutLink>
          </div>
        </>
      )}
      {!user.authorized && (
        <div>
          <a href="/log-in" className="btn btn-light">
            Log in
          </a>{" "}
          <a href="/sign-up" className="btn btn-primary">
            Sign up
          </a>
        </div>
      )}
    </div>
  );
};

export default NavBar;
