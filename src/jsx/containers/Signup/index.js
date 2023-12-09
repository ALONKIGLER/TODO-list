import React, { Fragment, useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
//
import { Link, Navigate } from "react-router-dom";

/**
 * @author
 * @function
 **/

const Signup = (props) => {
  const [authUser, setAuthUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
  const [citizenConst, setcitizenConst] = useState([]);
  const [Token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const checkUserAuth = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          setUser(user.email);
          console.log("lol");

          // Fetch ID token
          const userToken = await user.getIdToken();
          console.log("User Token:", userToken);
          setToken(user.accessToken);
          // fetchOrders();
        }
      });
    };

    checkUserAuth(); // Call the async function
  }, [authUser]);

  const signUpWithEmailAndPassword = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // User signed up successfully
      const user = userCredential.user;
      const userToken = await user.getIdToken();
      console.log("User signed up successfully:", user);

      // Do something with the user or navigate to a different page
    } catch (error) {
      // Handle signup errors
      console.error("Error during signup:", error.message);
      setNotice("Error during signup. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-lg-12 m-auto ">
            <div className="profile card card-body px-3 pt-3 pb-0 m-auto  ">
              <div className="profile-head m-auto ">
                <div className="photo-content ">
                  {/* <div className="cover-photo rounded"></div> */}
                </div>
                <div className="profile-info">
                  <h3 className="text-red"> Signup</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <form className="col-md-4 mt-3 pt-3 pb-3">
            <div
              className="form-floating mb-3"
              style={{ textAlign: "right", margin: "auto" }}
            >
              <input
                style={{ textAlign: "right", margin: "auto" }}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                // placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label htmlFor="exampleInputEmail1" className="form-label">
                כתובת מייל
              </label>
            </div>
            <div
              className="form-floating mb-3"
              style={{ textAlign: "right", margin: "auto" }}
            >
              <input
                style={{ textAlign: "right", margin: "auto" }}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                // placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <label htmlFor="exampleInputPassword1" className="form-label">
                סיסמא
              </label>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary pt-3 pb-3"
                onClick={(e) => signUpWithEmailAndPassword(e)}
              >
                שלח
              </button>
            </div>
            <div className="mt-3 text-center">
              <span> משתמש רשום כנס לחץ על הקישור והיכנס</span>
            </div>
            <div className="mt-3 text-center">
              <Link className="btn btn-primary pt-1 pb-1" to="/signin">
                signin
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
