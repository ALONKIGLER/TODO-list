import React, { Fragment, useState } from "react";
import SideBar from "./SideBar.js";
import NavHader from "./NavHader.js";

const JobieNav = () => {
  return (
    <Fragment>
      <NavHader />
      <SideBar />
    </Fragment>
  );
};

export default JobieNav;
