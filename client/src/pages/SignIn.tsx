import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassward, setConfirmPassward] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassward") setConfirmPassward(value);
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !confirmPassward) {
      setError("Please fill in all fields.");
    } else if (password !== confirmPassward) {
      setError("Please make sure the passwards are the same.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
      await axios
        .post("http://localhost:5031/register", {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            setError("Successful sign up.");
            navigate("/");
          } else {
            setError("Something went wrong.");
          }
        })
        .catch((error) => {
          setError("Error registering.");
        });
    }
  };
  return (
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
            <div className="mb-3">
              <label className="form-label">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassward"
                value={confirmPassward}
                onChange={handleChange}
              />
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
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
