import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import LogoutLink from "../components/LogoutLink";

const Home = () => {
  return (
    <AuthorizeView>
      <div className="text-end me-3">
        <AuthorizedUser value="email" /> |<LogoutLink>Logout</LogoutLink>
      </div>
    </AuthorizeView>
  );
};

export default Home;
