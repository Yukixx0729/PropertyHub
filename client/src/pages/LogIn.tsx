import { useEffect, useState } from "react";
import { useUser } from "../components/AuthorizeView";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberme] = useState<boolean>(false);
  const user = useUser();
  const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   console.log(user.details.email);
  //   if (user.details.email) {
  //     window.location.href = "/";
  //   }
  // }, [user.details.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "rememberme") setRememberme(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let loginurl = "";
    if (!email || !password) {
      setError("Please fill in all fields.");
    } else {
      setError("");

      rememberme === true
        ? (loginurl = "login?useCookies=true")
        : (loginurl = "login?useSessionCookies=true");
    }
    try {
      const res = await fetch(`http://localhost:5031/${loginurl}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      });

      if (res.ok) {
        setError("Successful Login.");
        await user.fetchUser();
        localStorage.setItem("login", "true");
        window.location.href = "/";
      } else {
        setError("Invalid email or password!");
      }
    } catch (error) {
      setError("Error logging in.");
    }
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="d-flex alert-success py-3 px-3 align-items-center justify-content-between">
        {" "}
        <a className="ps-3 p-2 " href="/">
          <h2>Property Hub</h2>
        </a>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-12 col-md-12 col-lg-4">
            <h1 className="mb-3">Log In</h1>
            <form onSubmit={handleSubmit}>
              {" "}
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  name="rememberme"
                  className="fom-check-input"
                  checked={rememberme}
                  onChange={handleChange}
                />
                <label className="form-check-label mx-1 text-secondary">
                  Remember Me?
                </label>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary ">
                  Log in
                </button>
                <a href="/sign-up" className="btn btn-secondary mx-3">
                  Sign up
                </a>
              </div>
            </form>
            {error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
