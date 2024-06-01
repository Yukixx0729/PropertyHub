import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/LogIn";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp";
import { useUser } from "./components/AuthorizeView";
import { useEffect } from "react";
import MySaved from "./components/Saved/MySaved";
import MyProperty from "./components/Property/MyProperty";
import AddProperty from "./components/Property/AddProperty";
import EditProperty from "./components/Property/EditProperty";

function App() {
  const location = useLocation();
  const user = useUser();

  useEffect(() => {
    if (!user.details.email) {
      user.fetchUser();
    }
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
        <Route path="/mysaved" element={<MySaved />} />
        <Route path="/myproperty" element={<MyProperty />} />
        <Route path="/addproperty" element={<AddProperty />} />
        <Route path="/editproperty/:propertyId" element={<EditProperty />} />
      </Routes>
    </>
  );
}

export default App;
