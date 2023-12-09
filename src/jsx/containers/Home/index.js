import React, { Fragment, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { render } from "react-dom";
import { Container } from "./example";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//
/**
 * @author
 * @function
 **/

import { auth } from "../../../firebase";

const Home = (props) => {
  const [authUser, setAuthUser] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(true);
        setUser(user.email);
      } else {
        // navigate("/signin");
      }
    });
  }, [authUser]);

  return (
    <div>
      <div className="row mt-10 mb-5">
        <div className="col-lg-12 m-auto ">
          <div className="profile card card-body px-3 pt-3 pb-0 m-auto  ">
            <div className="profile-head m-auto ">
              <div className="photo-content ">
                {/* <div className="cover-photo rounded"></div> */}
              </div>
              <div className="profile-info">
                <div
                  className="profile-name px-3 pt-2"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h3 className="text-red">TODO LIST </h3>
                  <h3 className="text-red"> {user} שלום לך </h3>
                  <p className="">
                    כאן תוכלו ליצור לעדכן ולמחוק פתקים, לאחר לחיצה על כפתור שמור
                    שינוים המידע ישמר כולל סדר הפתקים, תהנו
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="sfd">
          <DndProvider backend={HTML5Backend}>
            <Container user={user} />
          </DndProvider>
        </div>
      </div>
    </div>
  );
};

export default Home;
