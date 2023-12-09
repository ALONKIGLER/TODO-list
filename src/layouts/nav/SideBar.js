import React, { useEffect, useReducer, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { Collapse, Dropdown } from "react-bootstrap";
/// Link
import { Link } from "react-router-dom";
import { MenuList } from "./Menu.js";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
};

const SideBar = () => {
  var d = new Date();
  const navigate = useNavigate();

  const logoutUser = async (e) => {
    e.preventDefault();

    await signOut(auth);
    navigate("/signin");
  };

  const [state, setState] = useReducer(reducer, initialState);
  const [authUser, setAuthUser] = useState(false);
  let handleheartBlast = document.querySelector(".heart");
  function heartBlast() {
    return handleheartBlast.classList.toggle("heart-blast");
  }
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );
  const handleMenuActive = (status) => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  };
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" });
    }
  };

  let path = window.location.pathname;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(true);
      } else {
        setAuthUser(false);
      }
    });
  }, [authUser]);

  return (
    <div
      className={`dlabnav  
        fixed
       horizontal
       static
          
             fixed
         
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          {MenuList.map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass === "menu-title") {
              return (
                <li className={menuClass} key={index}>
                  {data.title}
                </li>
              );
            } else {
              return (
                <li
                  className={` ${
                    state.active === data.title ? "mm-active" : ""
                  }`}
                  key={index}
                >
                  {data.content && data.content.length > 0 ? (
                    <>
                      <Link
                        to={"#"}
                        className="has-arrow"
                        onClick={() => {
                          handleMenuActive(data.title);
                        }}
                      >
                        {data.iconStyle}
                        <span className="nav-text">{data.title}</span>
                      </Link>
                      <Collapse in={state.active === data.title ? true : false}>
                        <ul
                          className={`${
                            menuClass === "mm-collapse" ? "mm-show" : ""
                          }`}
                        >
                          {data.content &&
                            data.content.map((data, index) => {
                              return (
                                <li
                                  key={index}
                                  className={`${
                                    state.activeSubmenu === data.title
                                      ? "mm-active"
                                      : ""
                                  }`}
                                >
                                  {data.content && data.content.length > 0 ? (
                                    <>
                                      <Link
                                        to={data.to}
                                        className={
                                          data.hasMenu ? "has-arrow" : ""
                                        }
                                        onClick={() => {
                                          handleSubmenuActive(data.title);
                                        }}
                                      >
                                        {data.title}
                                      </Link>
                                      <Collapse
                                        in={
                                          state.activeSubmenu === data.title
                                            ? true
                                            : false
                                        }
                                      >
                                        <ul
                                          className={`${
                                            menuClass === "mm-collapse"
                                              ? "mm-show"
                                              : ""
                                          }`}
                                        >
                                          {data.content &&
                                            data.content.map((data, index) => {
                                              return (
                                                <>
                                                  <li key={index}>
                                                    <Link
                                                      className={`${
                                                        path === data.to
                                                          ? "mm-active"
                                                          : ""
                                                      }`}
                                                      to={data.to}
                                                    >
                                                      {data.title}
                                                    </Link>
                                                  </li>
                                                </>
                                              );
                                            })}
                                        </ul>
                                      </Collapse>
                                    </>
                                  ) : (
                                    <Link to={data.to}>{data.title}</Link>
                                  )}
                                </li>
                              );
                            })}
                        </ul>
                      </Collapse>
                    </>
                  ) : (
                    <Link to={data.to}>
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                  )}
                </li>
              );
            }
          })}
        </ul>
        {/* <div className="dropdown header-profile2 ">
          <div className="header-info2 text-center">
            <img src={profile} alt="" />
            <div className="sidebar-info">
              <div>
                <h5 className="font-w500 mb-0">William Johanson</h5>
                <span className="fs-12">williamjohn@mail.com</span>
              </div>
            </div>
            <div>
              <Link to={"#"} className="btn btn-md text-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div> */}
        <div className="copyright">
          <p className=" fs-12 text-center" style={{ fontSize: "1rem" }}>
            <a style={{ fontSize: "1rem" }} href="tel:1201">
              ער"ן - עזרה ראשונה נפשית - 1201
            </a>
          </p>
          <p className="fs-12 text-center">
            <a style={{ fontSize: "1rem" }} href="tel:037472010">
              מוקד תמיכה וסיוע נפשי 03-7472010
            </a>
          </p>
          <p className="fs-12 text-center">
            <a style={{ fontSize: "1rem" }} href="tel:1111">
              מוקד פניית הציבור של אגף כח אדם -1111 שלוחה 5 ולאחר מכן שלוחה 4
            </a>
          </p>
          <p className="fs-12 text-center">
            <a style={{ fontSize: "1rem" }} href="tel:104">
              מוקד פיקוד העורף - 104
            </a>
          </p>
          <p className="fs-12 text-center">
            <a style={{ fontSize: "1rem" }} href="tel:1800363363">
              קו סיוע עמות נטול - 1800363363{" "}
            </a>
          </p>
          {/* <p className="text-center">עם ישראל חי!!</p> */}
        </div>
        {/* <div className="copyright">fdsdsd</div> */}

        {authUser ? (
          <div style={{ textAlign: "center", margin: "auto" }} className="">
            <button
              type="submit"
              className="btn btn-primary pt-1 pb-1"
              onClick={(e) => logoutUser(e)}
            >
              התנתק
            </button>
          </div>
        ) : null}
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
