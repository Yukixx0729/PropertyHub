import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassward, setConfirmPassward] = useState<string>("");
  const [role, setRole] = useState<string>("tenant");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "role") setRole(value);

    if (name === "confirmPassward") setConfirmPassward(value);
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassward) {
      setError("Please fill in all fields.");
    } else if (password !== confirmPassward) {
      setError("Please make sure the passwards are the same.");
    } else if (password.length < 6) {
      setError("Password needs to at least contains 6 characters.");
    } else {
      setError("");

      if (!error) {
        try {
          const res = await fetch("http://localhost:5031/register", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            const response = await fetch(
              `http://localhost:5031/setrole?email=${email}&role=${role}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              setError("Successful sign up.");
              navigate("/log-in");
            }
          } else {
            const data = await res.json();
            if (data) {
              setError(data.errors[Object.keys(data.errors)[0]][0]);
            } else setError("Error registering.");
          }
        } catch (error) {
          setError("Error registering.");
        }
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassward("");
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
            <h1 className="mb-3">Sign In</h1>
            <form onSubmit={handleSumbit}>
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
              <div className="mb-4">
                <label className="form-label">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassward"
                  value={confirmPassward}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text">Role:</label>
                <select
                  className="form-select"
                  value={role}
                  name="role"
                  onChange={handleChange}
                >
                  <option value="tenant">tenant</option>
                  <option value="landlord">landlord</option>
                </select>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary ">
                  Sign in
                </button>
                <a href="/log-in" className="btn btn-secondary mx-3">
                  Log in
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

export default SignUp;
