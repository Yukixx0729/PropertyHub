import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/LogIn";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp";
import { useUser } from "./components/AuthorizeView";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const user = useUser();

  useEffect(() => {
    // check if the cookie,
  }, [location]);

  return (
    <>
      {location.pathname === "/sign-up" ||
      location.pathname === "/log-in" ? null : (
        <NavBar />
      )}
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
