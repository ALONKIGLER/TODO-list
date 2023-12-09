import React, { Fragment, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

//
/**
 * @author
 * @function
 **/

const Home = (props) => {
  const [emails, setEmail] = useState([]);
  const [authUser, setAuthUser] = useState(false);
  const [user, setUser] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://kiglerserver.com/api/v1/contactUs/"
      ); // Adjust the API endpoint
      setEmail(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(true);
        setUser(user.email);
        fetchOrders();
      } else {
        navigate("/signin");
      }
    });
  }, [authUser]);

  const deleteProduct = async (orderId) => {
    console.log("Deleting order:", orderId);
    // try {
    //   const response = await axios.delete(
    //     `https://kiglerserver.com/api/v1/citizen/${orderId}`
    //   );
    //   setDel(!status22);
    // } catch (error) {
    //   console.error("Error deleting order:", error);
    // }
  };

  const edit = async (product) => {
    console.log("setEdit_id", product._id);
    // setEdit_id(product._id);
    // setProductPic(product);
    // setFormData(product);
    // handleShow();
  };

  return (
    <div>
      <h1>SSSS</h1>
    </div>
  );
};

export default Home;
