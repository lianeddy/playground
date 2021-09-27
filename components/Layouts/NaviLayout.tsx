import React from "react";
import NaviBar from "../Navbar/Navibar";

const NaviLayout = ({ children }) => {
  return (
    <React.Fragment>
      <NaviBar />
      {children}
    </React.Fragment>
  );
};

export default NaviLayout;
