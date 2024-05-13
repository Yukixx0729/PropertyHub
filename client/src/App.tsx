import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Login from "./pages/LogIn";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

function App() {
  const location = useLocation();

  return location.pathname === "/sign-in" || location.pathname === "/log-in" ? (
    <>
      {" "}
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  ) : (
    <>
      {" "}
      <NavBar />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
