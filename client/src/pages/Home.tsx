import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import LogoutLink from "../components/LogoutLink";

const Home = () => {
  return (
    <AuthorizeView>
      <span>
        <LogoutLink>
          <AuthorizedUser value="email" /> Logout
        </LogoutLink>
      </span>
    </AuthorizeView>
  );
};

export default Home;
