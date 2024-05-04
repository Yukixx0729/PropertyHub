import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import LogoutLink from "../components/LogoutLink";

const Home = () => {
  return (
    <AuthorizeView>
      <span>
        <LogoutLink>
          Logout <AuthorizedUser value="email" />
        </LogoutLink>
      </span>
    </AuthorizeView>
  );
};

export default Home;
