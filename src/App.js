import React, { Fragment, useState, useEffect, useContext } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import Nav from "./layouts/nav";
import Signin from "./jsx/containers/Signin";
import Signup from "./jsx/containers/Signup";
import Home from "./jsx/containers//Home";
import Error400 from "./jsx/pages/Error400";
import Error500 from "./jsx/pages/Error500";
// import PrivateRoute from "./components/HOC/PrivateRoute";
import "./css//style.css";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const allroutes = [
  {
    url: "",
    component: <Home />,
  },
  {
    url: "home",
    component: <Home />,
  },
  { url: "page-error-400", component: Error400 },
  { url: "page-error-500", component: Error500 },
];

// let path = window.location.pathname;
// path = path.split("/");
// path = path[path.length - 1];
// console.log("path", path);

function App() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(true);
        setUser(user.email);
        navigate("/home");
      } else {
        navigate("/signin");
      }
    });
  }, [authUser]);

  return (
    <div className="App">
      <Routes>
        <Route path="page-error-400" element={<Error400 />} />
        <Route path="page-error-500" element={<Error500 />} />
        <Route element={<MainLayout />}>
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

function MainLayout() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div
      id="main-wrapper"
      className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${
        menuToggle ? "menu-toggle" : ""
      }`}
    >
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
